<script lang="ts">
  import type { Song } from "../types";

  const DEFAULT_SYMBOL_PATH =
    "https://kr.object.ncloudstorage.com/aacweb/symbols/after";

  interface Props {
    song: Song;
    showSongActions: boolean;
    onSelectSong: (song: Song) => void;
    onEditSong: (song: Song) => void;
    onDeleteSong: (song: Song) => void;
  }

  let { song, showSongActions, onSelectSong, onEditSong, onDeleteSong }: Props =
    $props();

  function resolveThumbnailUrl(song: Song): string {
    const thumbnail = song.thumbnail;

    if (!thumbnail) {
      return "";
    }

    const symbolPath = (
      import.meta.env.VITE_SYMBOL_PATH || DEFAULT_SYMBOL_PATH
    ).replace(/\/+$/, "");
    const origin = thumbnail.origin || "common";

    return `${symbolPath}/${origin}/${thumbnail.genName}`;
  }
</script>

<div class="song-card">
  <button class="song-info" onclick={() => onSelectSong(song)} type="button">
    {#if song.thumbnail}
      <div class="song-thumbnail-wrap">
        <img
          class="song-thumbnail"
          src={resolveThumbnailUrl(song)}
          alt={song.thumbnail.wordName || song.singTitle || "노래 썸네일"}
        />
      </div>
    {/if}
    <h2>{song.singTitle ?? "제목 없는 노래"}</h2>
    {#if song.numOfCols !== null}
      <p class="song-cols">{song.numOfCols}열</p>
    {/if}
  </button>
  {#if showSongActions}
    <div class="song-actions">
      <button class="btn-edit" onclick={() => onEditSong(song)}>편집</button>
      <button
        class="btn-delete"
        onclick={() => onDeleteSong(song)}
        type="button"
      >
        삭제
      </button>
    </div>
  {/if}
</div>

<style>
  .song-card {
    position: relative;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .song-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .song-info {
    width: 100%;
    padding: 20px;
    cursor: pointer;
    background: transparent;
    border: none;
    text-align: left;
  }

  .song-thumbnail-wrap {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 48px;
    height: 48px;
  }

  .song-thumbnail {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
  }

  .song-info h2 {
    margin: 0 0 10px 0;
    font-size: 24px;
    color: #333;
  }

  .song-cols {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #64748b;
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
    color: #2196f3;
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
</style>
