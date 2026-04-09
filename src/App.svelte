<script lang="ts">
  import { onMount } from "svelte";
  import BookTreeView from "./components/BookTreeView.svelte";
  import DevLoginView from "./components/DevLoginView.svelte";
  import Modal from "./components/modal/Modal.svelte";
  import SongList from "./components/SongList.svelte";
  import SongPlayer from "./components/SongPlayer.svelte";
  import SongEditor from "./components/SongEditor.svelte";
  import Tabs from "./components/tab/Tabs.svelte";
  import { modalContext } from "./components/modal";
  import { restApi } from "./lib/api";
  import { getLoginSession, saveLoginSession } from "./lib/storage";
  import type {
    LoginSession,
    ReadingTreeFolderNode,
    Screen,
    SelectedReadingBook,
    Song,
  } from "./types";

  const isDev = import.meta.env.DEV;

  let currentScreen = $state<Screen>("list");
  let selectedSong = $state<Song | null>(null);
  let editingSong = $state<Song | null>(null);
  let loginPending = $state(false);
  let loginMessage = $state("");
  let loginSession = $state<LoginSession | null>(null);
  let readingTreePending = $state(false);
  let selectedReadingBook = $state<SelectedReadingBook | null>(null);
  let singingSongs = $state<{
    common: Song[];
    owner: Song[];
    student: Song[];
    teacher: Song[];
  }>({
    common: [],
    owner: [],
    student: [],
    teacher: [],
  });
  let singingSongsLoading = $state(true);
  let singingSongsError = $state("");

  function isStudentLogin() {
    return loginSession?.student === true;
  }

  function getSongsForTab(tabId: string): Song[] {
    if (tabId === "owner") {
      return singingSongs.owner;
    }

    if (tabId === "teacher") {
      return singingSongs.teacher;
    }

    if (tabId === "student") {
      return singingSongs.student;
    }

    return singingSongs.common;
  }

  function getSongTabs() {
    const tabs = [
      { id: "common", label: `공통곡 (${singingSongs.common.length})` },
      { id: "owner", label: `내 곡 (${singingSongs.owner.length})` },
    ];

    if (isStudentLogin()) {
      tabs.push({
        id: "teacher",
        label: `선생님 (${singingSongs.teacher.length})`,
      });
    } else {
      tabs.push({
        id: "student",
        label: `학생들 (${singingSongs.student.length})`,
      });
    }

    return tabs;
  }

  async function loadSingingSongs() {
    singingSongsLoading = true;
    singingSongsError = "";

    try {
      const response = await restApi.getSingingSongs();
      singingSongs = {
        common: response.common ?? [],
        owner: response.owner ?? [],
        student: response.student ?? [],
        teacher: response.teacher ?? [],
      };
    } catch (error) {
      singingSongs = { common: [], owner: [], student: [], teacher: [] };
      singingSongsError =
        error instanceof Error
          ? error.message
          : "노래 목록을 불러오지 못했습니다.";
    } finally {
      singingSongsLoading = false;
    }
  }

  function handleSelectSong(song: Song) {
    selectedSong = song;
    currentScreen = "play";
  }

  function handleEditSong(song: Song) {
    editingSong = song;
    currentScreen = "edit";
  }

  function handleBackToList() {
    currentScreen = "list";
    selectedSong = null;
    editingSong = null;
  }

  async function handleSongSaved() {
    await loadSingingSongs();
    handleBackToList();
  }

  function handleSongComplete() {
    setTimeout(() => {
      currentScreen = "list";
      selectedSong = null;
    }, 3000);
  }

  async function handleDevLogin(
    userId: string,
    password: string,
  ): Promise<boolean> {
    if (!userId.trim() || !password.trim()) {
      loginMessage = "아이디와 비밀번호를 입력하세요.";
      return false;
    }

    loginPending = true;
    loginMessage = "";

    try {
      const response = await restApi.login({
        userID: userId.trim(),
        userPassword: password,
      });

      loginSession = response;
      saveLoginSession(response);

      loginMessage = "개발용 로그인에 성공했습니다.";
      return true;
    } catch (error) {
      loginMessage =
        error instanceof Error ? error.message : "로그인 요청에 실패했습니다.";
      return false;
    } finally {
      loginPending = false;
    }
  }

  async function handleLoadReadingTree() {
    readingTreePending = true;

    try {
      const tree = await restApi.getReadingCategoryTree();

      modalContext.startModal({
        component: BookTreeView,
        title: "책 목록",
        maxWidth: "min(960px, calc(100vw - 32px))",
        props: {
          initialTree: tree as ReadingTreeFolderNode | null,
          onSelectBook: (book: SelectedReadingBook) => {
            selectedReadingBook = book;
            editingSong = book.song;
            currentScreen = "edit";
          },
        },
      });
    } catch (error) {
      loginMessage =
        error instanceof Error
          ? error.message
          : "책 목록을 불러오지 못했습니다.";
    } finally {
      readingTreePending = false;
    }
  }

  onMount(() => {
    loginSession = getLoginSession();
    void loadSingingSongs();
  });
</script>

<main>
  {#if isDev}
    <DevLoginView
      {loginPending}
      {loginMessage}
      {selectedReadingBook}
      onLogin={handleDevLogin}
    />
  {/if}

  {#if currentScreen === "list"}
    <Tabs tabs={getSongTabs()} let:selected>
      <SongList
        songs={getSongsForTab(selected)}
        songsLoading={singingSongsLoading}
        songsError={singingSongsError}
        showSongActions={selected === "owner"}
        onRefreshSongs={loadSingingSongs}
        onSelectSong={handleSelectSong}
        onImportSong={handleLoadReadingTree}
        onEditSong={handleEditSong}
      />
    </Tabs>
  {:else if currentScreen === "play" && selectedSong}
    <SongPlayer
      song={selectedSong}
      onBack={handleBackToList}
      onComplete={handleSongComplete}
    />
  {:else if currentScreen === "edit"}
    <SongEditor
      song={editingSong}
      onSave={() => void handleSongSaved()}
      onCancel={handleBackToList}
    />
  {/if}
</main>

<Modal />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
    background: #f5f5f5;
  }

  main {
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
