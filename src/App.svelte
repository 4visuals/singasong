<script lang="ts">
  import SongList from './components/SongList.svelte';
  import SongPlayer from './components/SongPlayer.svelte';
  import SongEditor from './components/SongEditor.svelte';
  import type { Screen, Song } from './types';

  let currentScreen = $state<Screen>('list');
  let selectedSong = $state<Song | null>(null);
  let editingSong = $state<Song | null>(null);

  function handleSelectSong(song: Song) {
    selectedSong = song;
    currentScreen = 'play';
  }

  function handleAddSong() {
    editingSong = null;
    currentScreen = 'edit';
  }

  function handleEditSong(song: Song) {
    editingSong = song;
    currentScreen = 'edit';
  }

  function handleBackToList() {
    currentScreen = 'list';
    selectedSong = null;
    editingSong = null;
  }

  function handleSongComplete() {
    setTimeout(() => {
      currentScreen = 'list';
      selectedSong = null;
    }, 3000);
  }
</script>

<main>
  {#if currentScreen === 'list'}
    <SongList
      onSelectSong={handleSelectSong}
      onAddSong={handleAddSong}
      onEditSong={handleEditSong}
    />
  {:else if currentScreen === 'play' && selectedSong}
    <SongPlayer
      song={selectedSong}
      onBack={handleBackToList}
      onComplete={handleSongComplete}
    />
  {:else if currentScreen === 'edit'}
    <SongEditor
      song={editingSong}
      onSave={handleBackToList}
      onCancel={handleBackToList}
    />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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
