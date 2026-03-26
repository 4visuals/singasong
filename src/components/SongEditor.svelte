<script lang="ts">
  import { saveSong } from '../lib/storage';
  import type { Song, Verse, Word } from '../types';

  interface Props {
    song: Song | null;
    onSave: () => void;
    onCancel: () => void;
  }

  let { song, onSave, onCancel }: Props = $props();

  let formData = $state<Song>({
    id: song?.id || crypto.randomUUID(),
    title: song?.title || '',
    originalVideoUrl: song?.originalVideoUrl || '',
    bgMusicVideoUrl: song?.bgMusicVideoUrl || '',
    vocalAudioFile: song?.vocalAudioFile || undefined,
    verses: song?.verses || []
  });

  function addVerse() {
    formData.verses = [...formData.verses, {
      id: crypto.randomUUID(),
      words: [],
      startTime: 0,
      endTime: 0
    }];
  }

  function removeVerse(verseId: string) {
    formData.verses = formData.verses.filter(v => v.id !== verseId);
  }

  function addWord(verseId: string) {
    formData.verses = formData.verses.map(verse => {
      if (verse.id === verseId) {
        return {
          ...verse,
          words: [...verse.words, {
            id: crypto.randomUUID(),
            text: '',
            imageUrl: '',
            startTime: 0,
            endTime: 0
          }]
        };
      }
      return verse;
    });
  }

  function removeWord(verseId: string, wordId: string) {
    formData.verses = formData.verses.map(verse => {
      if (verse.id === verseId) {
        return {
          ...verse,
          words: verse.words.filter(w => w.id !== wordId)
        };
      }
      return verse;
    });
  }

  function updateWord(verseId: string, wordId: string, field: keyof Word, value: any) {
    formData.verses = formData.verses.map(verse => {
      if (verse.id === verseId) {
        return {
          ...verse,
          words: verse.words.map(word => {
            if (word.id === wordId) {
              return { ...word, [field]: value };
            }
            return word;
          })
        };
      }
      return verse;
    });
  }

  function updateVerse(verseId: string, field: keyof Verse, value: any) {
    formData.verses = formData.verses.map(verse => {
      if (verse.id === verseId) {
        return { ...verse, [field]: value };
      }
      return verse;
    });
  }

  function handleVocalAudioUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      formData.vocalAudioFile = file;
    }
  }

  function handleSave() {
    if (!formData.title.trim()) {
      alert('노래 제목을 입력하세요.');
      return;
    }

    saveSong(formData);
    onSave();
  }
</script>

<div class="editor-container">
  <div class="header">
    <h1>{song ? '노래 편집' : '노래 추가'}</h1>
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

    <div class="form-group">
      <label for="bg-music-video-url">배경음악 동영상 링크</label>
      <input
        id="bg-music-video-url"
        type="url"
        bind:value={formData.bgMusicVideoUrl}
        placeholder="https://youtu.be/..."
      />
    </div>

    <div class="form-group">
      <label for="vocal-audio-file">보컬 음원 업로드</label>
      <input
        id="vocal-audio-file"
        type="file"
        accept="audio/*"
        onchange={handleVocalAudioUpload}
      />
      {#if formData.vocalAudioFile}
        <p class="file-info">
          ✓ {formData.vocalAudioFile instanceof File ? formData.vocalAudioFile.name : '파일 업로드됨'}
        </p>
      {/if}
    </div>
  </div>

  <div class="form-section">
    <div class="section-header">
      <h2>노래 가사</h2>
      <button class="btn-add-verse" onclick={addVerse}>+ 소절 추가</button>
    </div>

    {#each formData.verses as verse, verseIndex (verse.id)}
      <div class="verse-panel">
        <div class="verse-header">
          <h3>소절 {verseIndex + 1}</h3>
          <button class="btn-remove" onclick={() => removeVerse(verse.id)}>삭제</button>
        </div>

        <div class="verse-timing">
          <div class="form-group-inline">
            <label for="verse-start-{verse.id}">시작 시간 (초)</label>
            <input
              id="verse-start-{verse.id}"
              type="number"
              step="0.1"
              value={verse.startTime}
              oninput={(e) => updateVerse(verse.id, 'startTime', parseFloat((e.target as HTMLInputElement).value))}
            />
          </div>
          <div class="form-group-inline">
            <label for="verse-end-{verse.id}">종료 시간 (초)</label>
            <input
              id="verse-end-{verse.id}"
              type="number"
              step="0.1"
              value={verse.endTime}
              oninput={(e) => updateVerse(verse.id, 'endTime', parseFloat((e.target as HTMLInputElement).value))}
            />
          </div>
        </div>

        <div class="words-section">
          <button class="btn-add-word" onclick={() => addWord(verse.id)}>+ 어절 추가</button>

          {#each verse.words as word, wordIndex (word.id)}
            <div class="word-card">
              <div class="word-header">
                <span class="word-number">어절 {wordIndex + 1}</span>
                <button class="btn-remove-small" onclick={() => removeWord(verse.id, word.id)}>✕</button>
              </div>

              <div class="form-group">
                <label for="word-text-{word.id}">가사</label>
                <input
                  id="word-text-{word.id}"
                  type="text"
                  value={word.text}
                  oninput={(e) => updateWord(verse.id, word.id, 'text', (e.target as HTMLInputElement).value)}
                  placeholder="가사를 입력하세요"
                />
              </div>

              <div class="form-group">
                <label for="word-image-{word.id}">이미지 URL</label>
                <input
                  id="word-image-{word.id}"
                  type="url"
                  value={word.imageUrl}
                  oninput={(e) => updateWord(verse.id, word.id, 'imageUrl', (e.target as HTMLInputElement).value)}
                  placeholder="https://..."
                />
                {#if word.imageUrl}
                  <img src={word.imageUrl} alt="미리보기" class="image-preview" />
                {/if}
              </div>

              <div class="word-timing">
                <div class="form-group-inline">
                  <label for="word-start-{word.id}">시작 (초)</label>
                  <input
                    id="word-start-{word.id}"
                    type="number"
                    step="0.1"
                    value={word.startTime}
                    oninput={(e) => updateWord(verse.id, word.id, 'startTime', parseFloat((e.target as HTMLInputElement).value))}
                  />
                </div>
                <div class="form-group-inline">
                  <label for="word-end-{word.id}">종료 (초)</label>
                  <input
                    id="word-end-{word.id}"
                    type="number"
                    step="0.1"
                    value={word.endTime}
                    oninput={(e) => updateWord(verse.id, word.id, 'endTime', parseFloat((e.target as HTMLInputElement).value))}
                  />
                </div>
              </div>
            </div>
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

  h3 {
    margin: 0;
    font-size: 20px;
    color: #2196F3;
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
    background: #4CAF50;
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

  .form-group-inline input[type="number"] {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    transition: border-color 0.2s;
  }

  .form-group input:focus {
    outline: none;
    border-color: #2196F3;
  }

  .form-group input[type="file"] {
    padding: 8px;
  }

  .file-info {
    margin-top: 8px;
    color: #4CAF50;
    font-size: 14px;
  }

  .image-preview {
    margin-top: 10px;
    max-width: 100px;
    max-height: 100px;
    border-radius: 8px;
    border: 2px solid #ddd;
  }

  .btn-add-verse {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background: #2196F3;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-add-verse:hover {
    background: #1976D2;
  }

  .verse-panel {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    border: 2px solid #e0e0e0;
  }

  .verse-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .btn-remove {
    padding: 8px 16px;
    font-size: 14px;
    color: white;
    background: #f44336;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-remove:hover {
    background: #d32f2f;
  }

  .verse-timing {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  .form-group-inline {
    flex: 1;
  }

  .form-group-inline label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
    font-size: 14px;
  }

  .form-group-inline input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
  }

  .words-section {
    margin-top: 20px;
  }

  .btn-add-word {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    color: #2196F3;
    background: white;
    border: 2px dashed #2196F3;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 15px;
    transition: all 0.2s;
  }

  .btn-add-word:hover {
    background: #e3f2fd;
  }

  .word-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 15px;
    border: 2px solid #ddd;
  }

  .word-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .word-number {
    font-weight: bold;
    color: #666;
  }

  .btn-remove-small {
    width: 28px;
    height: 28px;
    padding: 0;
    font-size: 18px;
    color: #f44336;
    background: white;
    border: 2px solid #f44336;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-remove-small:hover {
    background: #f44336;
    color: white;
  }

  .word-timing {
    display: flex;
    gap: 15px;
  }
</style>
