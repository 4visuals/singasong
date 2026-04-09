<script lang="ts">
  import { onMount } from "svelte";
  import BookTreeView from "./components/BookTreeView.svelte";
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
  let showDevLoginForm = $state(false);
  let devLoginUserId = $state("");
  let devLoginPassword = $state("");
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

  function toggleDevLoginForm() {
    showDevLoginForm = !showDevLoginForm;
    loginMessage = "";

    if (!showDevLoginForm) {
      devLoginUserId = "";
      devLoginPassword = "";
    }
  }

  async function handleDevLogin() {
    if (!devLoginUserId.trim() || !devLoginPassword.trim()) {
      loginMessage = "아이디와 비밀번호를 입력하세요.";
      return;
    }

    loginPending = true;
    loginMessage = "";

    try {
      const response = await restApi.login({
        userID: devLoginUserId.trim(),
        userPassword: devLoginPassword,
      });

      loginSession = response;
      saveLoginSession(response);

      loginMessage = "개발용 로그인에 성공했습니다.";
      showDevLoginForm = false;
    } catch (error) {
      loginMessage =
        error instanceof Error ? error.message : "로그인 요청에 실패했습니다.";
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
    <div class="dev-login-panel">
      <div class="dev-login-controls">
        <button
          class="dev-login-button"
          onclick={toggleDevLoginForm}
          disabled={loginPending}
          type="button"
        >
          {showDevLoginForm ? "로그인 폼 닫기" : "개발용 로그인"}
        </button>

        {#if showDevLoginForm}
          <form
            class="dev-login-form"
            onsubmit={(event) => {
              event.preventDefault();
              void handleDevLogin();
            }}
          >
            <input
              class="dev-login-input"
              type="text"
              bind:value={devLoginUserId}
              placeholder="아이디"
              autocomplete="username"
              disabled={loginPending}
            />
            <input
              class="dev-login-input"
              type="password"
              bind:value={devLoginPassword}
              placeholder="비밀번호"
              autocomplete="current-password"
              disabled={loginPending}
            />
            <button
              class="dev-login-submit"
              type="submit"
              disabled={loginPending}
            >
              {loginPending ? "로그인 중..." : "로그인"}
            </button>
          </form>
        {/if}
      </div>

      {#if loginMessage}
        <p class="dev-login-message">{loginMessage}</p>
      {/if}

      {#if selectedReadingBook}
        <p class="dev-login-message">
          선택된 책: {selectedReadingBook.detail.bookName}
          ({selectedReadingBook.detail.paras.length}개 문단)
        </p>
      {/if}
    </div>
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

  .dev-login-panel {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
    padding: 12px 16px;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .dev-login-controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .dev-login-button {
    border: 0;
    border-radius: 8px;
    padding: 10px 14px;
    font: inherit;
    font-weight: 600;
    color: #ffffff;
    background: #1f6feb;
    cursor: pointer;
  }

  .dev-login-form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
  }

  .dev-login-input {
    flex: 1 1 180px;
    min-width: 0;
    padding: 10px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font: inherit;
  }

  .dev-login-submit {
    border: 0;
    border-radius: 8px;
    padding: 10px 14px;
    font: inherit;
    font-weight: 600;
    color: #ffffff;
    background: #16a34a;
    cursor: pointer;
  }

  .dev-login-button:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .dev-login-submit:disabled,
  .dev-login-input:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .dev-login-message {
    margin: 0;
    color: #333333;
    font-size: 14px;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
