<script lang="ts">
  import Symbol from "./Symbol.svelte";
  import { saveSong } from "../lib/storage";
  import type { Song } from "../types";

  interface Props {
    song: Song | null;
    onSave: () => void;
    onCancel: () => void;
  }

  let { song, onSave, onCancel }: Props = $props();

  function createFormData(source: Song | null): Song {
    return {
      id: source?.id || crypto.randomUUID(),
      title: source?.title || "",
      originalVideoUrl: source?.originalVideoUrl || "",
      bgMusicVideoUrl: source?.bgMusicVideoUrl || "",
      vocalAudioFile: source?.vocalAudioFile || undefined,
      verses: (source?.verses || []).map((verse) => ({
        ...verse,
        words: verse.words.map((word) => ({ ...word })),
      })),
    };
  }

  let formData = $state<Song>(createFormData(null));

  $effect(() => {
    formData = createFormData(song);
  });

  function addVerse() {
    formData.verses = [
      ...formData.verses,
      {
        id: crypto.randomUUID(),
        words: [],
      },
    ];
  }

  function removeVerse(verseId: string) {
    formData.verses = formData.verses.filter((v) => v.id !== verseId);
  }

  function handleSave() {
    if (!formData.title.trim()) {
      alert("노래 제목을 입력하세요.");
      return;
    }

    saveSong(formData);
    onSave();
  }
</script>

<div class="editor-container">
  <div class="header">
    <h1>{song ? "노래 편집" : "노래 추가"}</h1>
    <div class="header-actions">
      <button class="btn-cancel" onclick={onCancel}>취소</button>
      <button class="btn-save" onclick={handleSave}>저장</button>
    </div>
  </div>

  <div class="form-section">
    <h2>기본 정보</h2>
    <div class="form-group">
      <label for="song-title">노래 제목</label>
      <input
        id="song-title"
        type="text"
        bind:value={formData.title}
        placeholder="노래 제목을 입력하세요"
      />
    </div>

    <div class="form-group">
      <label for="original-video-url">원본 동영상 링크</label>
      <input
        id="original-video-url"
        type="url"
        bind:value={formData.originalVideoUrl}
        placeholder="https://youtu.be/..."
      />
    </div>
  </div>

  <div class="form-section">
    <div class="section-header">
      <h2>노래 가사</h2>
      <button class="btn-add-verse" onclick={addVerse}>+ 소절 추가</button>
    </div>

    {#each formData.verses as verse, verseIndex (verse.id)}
      <div class="verse-panel">
        <div class="words-section">
          {#each verse.words as word, wordIndex (word.id)}
            <Symbol imageUrl={word.imageUrl} text={word.text} />
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .editor-container {
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 40px;
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

  h2 {
    margin: 0 0 20px 0;
    font-size: 24px;
    color: #333;
  }

  .header-actions {
    display: flex;
    gap: 10px;
  }

  .btn-cancel {
    padding: 12px 24px;
    font-size: 16px;
    background: white;
    color: #666;
    border: 2px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-cancel:hover {
    background: #f5f5f5;
    border-color: #999;
  }

  .btn-save {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background: #4caf50;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-save:hover {
    background: #45a049;
  }

  .form-section {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
  }

  .form-group input[type="text"],
  .form-group input[type="url"] {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    transition: border-color 0.2s;
  }

  .form-group input:focus {
    outline: none;
    border-color: #2196f3;
  }

  .btn-add-verse {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background: #2196f3;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-add-verse:hover {
    background: #1976d2;
  }

  .verse-panel {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    border: 2px solid #e0e0e0;
  }

  .words-section {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
