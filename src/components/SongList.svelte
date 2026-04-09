<script lang="ts">
  import { restApi } from "../lib/api";
  import SongCard from "./SongCard.svelte";
  import type { Song } from "../types";

  interface Props {
    songs: Song[];
    songsLoading: boolean;
    songsError: string;
    showSongActions: boolean;
    onSelectSong: (song: Song) => void;
    onImportSong: () => void;
    onEditSong: (song: Song) => void;
    onRefreshSongs: () => Promise<void> | void;
  }

  let {
    songs,
    songsLoading,
    songsError,
    showSongActions,
    onSelectSong,
    onImportSong,
    onEditSong,
    onRefreshSongs,
  }: Props = $props();

  async function handleDelete(song: Song) {
    if (!confirm("이 노래를 삭제하시겠습니까?")) {
      return;
    }

    try {
      if (song.singSeq == null) {
        throw new Error("삭제할 노래 식별자가 없습니다.");
      }

      await restApi.deleteSingingSong(song.singSeq);
      await onRefreshSongs();
    } catch (error) {
      alert(error instanceof Error ? error.message : "삭제 실패");
    }
  }

  function handleEdit(song: Song) {
    onEditSong(song);
  }
</script>

<div class="container" data-comp="SongList">
  <div class="header">
    <h1>노래 목록</h1>
    <div class="buttons">
      <button class="btn-import" onclick={onImportSong}>불러오기</button>
    </div>
  </div>

  <div class="song-grid">
    {#if songsLoading}
      <div class="empty-state">
        <p>노래 목록을 불러오는 중입니다.</p>
      </div>
    {:else if songsError}
      <div class="empty-state">
        <p>{songsError}</p>
        <button
          class="btn-import"
          type="button"
          onclick={() => void onRefreshSongs()}
        >
          다시 시도
        </button>
      </div>
    {:else}
      {#if songs.length === 0}
        <div class="empty-state">
          <p>노래가 없습니다.</p>
          <p>불러오기 버튼을 눌러 노래를 준비하세요.</p>
        </div>
      {/if}

      {#each songs as song (song.singSeq ?? `${song.bookRef ?? "draft"}-${song.singTitle ?? ""}`)}
        <SongCard
          {song}
          {showSongActions}
          {onSelectSong}
          onEditSong={handleEdit}
          onDeleteSong={(selectedSong) => void handleDelete(selectedSong)}
        />
      {/each}
    {/if}
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  h1 {
    margin: 0;
    font-size: 32px;
    color: #333;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  .btn-import {
    padding: 12px 24px;
    font-size: 18px;
    font-weight: bold;
    color: #1d4ed8;
    background: #dbeafe;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-import:hover {
    background: #bfdbfe;
  }

  .song-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 20px;
    color: #999;
  }

  .empty-state p {
    margin: 10px 0;
    font-size: 18px;
  }
</style>
