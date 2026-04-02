<script lang="ts">
  import BookTreeView from "./components/BookTreeView.svelte";
  import Modal from "./components/modal/Modal.svelte";
  import SongList from "./components/SongList.svelte";
  import SongPlayer from "./components/SongPlayer.svelte";
  import SongEditor from "./components/SongEditor.svelte";
  import { modalContext } from "./components/modal";
  import { restApi } from "./lib/api";
  import type {
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
  let readingTreePending = $state(false);
  let selectedReadingBook = $state<SelectedReadingBook | null>(null);

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

  function handleSongComplete() {
    setTimeout(() => {
      currentScreen = "list";
      selectedSong = null;
    }, 3000);
  }

  async function handleDevLogin() {
    loginPending = true;
    loginMessage = "";

    try {
      await restApi.login({
        userID: "dummy",
        userPassword: "8801",
      });

      loginMessage = "개발용 로그인에 성공했습니다.";
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
</script>

<main>
  {#if isDev}
    <div class="dev-login-panel">
      <button
        class="dev-login-button"
        onclick={handleDevLogin}
        disabled={loginPending}
      >
        {loginPending ? "로그인 중..." : "개발용 로그인"}
      </button>

      {#if loginMessage}
        <p class="dev-login-message">{loginMessage}</p>
      {/if}

      {#if selectedReadingBook}
        <p class="dev-login-message">
          선택된 책: {selectedReadingBook.song.title}
          ({selectedReadingBook.song.verses.length}개 소절)
        </p>
      {/if}
    </div>
  {/if}

  {#if currentScreen === "list"}
    <SongList
      onSelectSong={handleSelectSong}
      onImportSong={handleLoadReadingTree}
onEditSong={handleEditSong}
    />
  {:else if currentScreen === "play" && selectedSong}
    <SongPlayer
      song={selectedSong}
      onBack={handleBackToList}
      onComplete={handleSongComplete}
    />
  {:else if currentScreen === "edit"}
    <SongEditor
      song={editingSong}
      onSave={handleBackToList}
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
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding: 12px 16px;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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

  .dev-login-button:disabled {
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
