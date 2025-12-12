<script lang="ts">
  import { getSongs, deleteSong, isSeedSong } from '../lib/storage';
  import type { Song } from '../types';

  interface Props {
    onSelectSong: (song: Song) => void;
    onAddSong: () => void;
    onEditSong: (song: Song) => void;
  }

  let { onSelectSong, onAddSong, onEditSong }: Props = $props();

  let songs = $state<Song[]>(getSongs());

  function handleDelete(id: string) {
    if (isSeedSong(id)) {
      alert('기본 제공 노래는 삭제할 수 없습니다.');
      return;
    }

    if (confirm('이 노래를 삭제하시겠습니까?')) {
      try {
        deleteSong(id);
        songs = getSongs();
      } catch (error) {
        alert(error instanceof Error ? error.message : '삭제 실패');
      }
    }
  }

  function handleEdit(song: Song) {
    if (isSeedSong(song.id)) {
      alert('기본 제공 노래는 편집할 수 없습니다.');
      return;
    }
    onEditSong(song);
  }

  function refreshSongs() {
    songs = getSongs();
  }

  $effect(() => {
    const interval = setInterval(refreshSongs, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="container">
  <div class="header">
    <h1>노래 목록</h1>
    <div class="buttons">
      <button class="btn-add" onclick={onAddSong}>+ 곡 추가</button>
    </div>
  </div>
  <audio src="https://kr.object.ncloudstorage.com/tesis/media/todoFlores_vocals.mp3" controls></audio>

  <div class="song-grid">
    {#each songs as song (song.id)}
      <div class="song-card">
        <div class="song-info" onclick={() => onSelectSong(song)}>
          <h2>{song.title}</h2>
          <p>{song.verses.length}개 소절</p>
        </div>
        <div class="song-actions">
          <button class="btn-edit" onclick={() => handleEdit(song)}>편집</button>
          <button class="btn-delete" onclick={() => handleDelete(song.id)}>삭제</button>
        </div>
      </div>
    {/each}

    {#if songs.length === 0}
      <div class="empty-state">
        <p>노래가 없습니다.</p>
        <p>+ 곡 추가 버튼을 눌러 노래를 추가하세요.</p>
      </div>
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

  .btn-add {
    padding: 12px 24px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: #4CAF50;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-add:hover {
    background: #45a049;
  }

  .song-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .song-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .song-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .song-info {
    padding: 20px;
    cursor: pointer;
  }

  .song-info h2 {
    margin: 0 0 10px 0;
    font-size: 24px;
    color: #333;
  }

  .song-info p {
    margin: 0;
    color: #666;
    font-size: 16px;
  }

  .song-actions {
    display: flex;
    border-top: 1px solid #eee;
  }

  .song-actions button {
    flex: 1;
    padding: 12px;
    font-size: 16px;
    border: none;
    background: white;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-edit {
    color: #2196F3;
    border-right: 1px solid #eee;
  }

  .btn-edit:hover {
    background: #e3f2fd;
  }

  .btn-delete {
    color: #f44336;
  }

  .btn-delete:hover {
    background: #ffebee;
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
