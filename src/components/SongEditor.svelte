<script lang="ts">
  import { restApi } from "../lib/api";
  import Symbol from "./Symbol.svelte";
  import type { ReadingPicture, Song } from "../types";

  const DEFAULT_SYMBOL_PATH =
    "https://kr.object.ncloudstorage.com/aacweb/symbols/after";

  interface Props {
    song: Song | null;
    onSave: () => void;
    onCancel: () => void;
  }

  let { song, onSave, onCancel }: Props = $props();
  let savePending = $state(false);
  let isEditing = $derived(song?.singSeq != null);
  let thumbnailOptions = $state<ReadingPicture[]>([]);
  let thumbnailsLoading = $state(false);
  let thumbnailsError = $state("");
  let thumbnailOptionsBookRef = $state<number | null | undefined>(undefined);

  function createFormData(source: Song | null): Song {
    return {
      singSeq: source?.singSeq ?? null,
      singTitle: source?.singTitle ?? "",
      numOfCols: source?.numOfCols ?? 4,
      singSkipLines: source?.singSkipLines ?? 0,
      singUrl: source?.singUrl ?? "",
      singOrigin: source?.singOrigin ?? null,
      singCreated: source?.singCreated ?? null,
      singOwnerRef: source?.singOwnerRef ?? null,
      teacherRef: source?.teacherRef ?? null,
      bookRef: source?.bookRef ?? null,
      thumbnail: source?.thumbnail ?? null,
    };
  }

  let formData = $state<Song>(createFormData(null));

  $effect(() => {
    formData = createFormData(song);
  });

  function resolvePictureUrl(picture: ReadingPicture): string {
    const symbolPath = (
      import.meta.env.VITE_SYMBOL_PATH || DEFAULT_SYMBOL_PATH
    ).replace(/\/+$/, "");
    const origin = picture.origin || "common";
    return `${symbolPath}/${origin}/${picture.genName}`;
  }

  function collectThumbnailOptions(
    bookDetail: Awaited<ReturnType<typeof restApi.getReadingBookDetail>>,
  ): ReadingPicture[] {
    const seen = new Set<string>();

    return bookDetail.paras.flatMap((paragraph) =>
      paragraph.symbols
        .map((symbol) => symbol.pic)
        .filter((picture) => {
          const key = `${picture.picSeq}-${picture.genName}`;

          if (seen.has(key)) {
            return false;
          }

          seen.add(key);
          return true;
        }),
    );
  }

  async function loadThumbnailOptions(bookRef: number | null) {
    if (bookRef == null) {
      thumbnailOptions = [];
      thumbnailsError = "";
      thumbnailsLoading = false;
      thumbnailOptionsBookRef = null;
      return;
    }

    thumbnailsLoading = true;
    thumbnailsError = "";
    thumbnailOptionsBookRef = bookRef;

    try {
      const detail = await restApi.getReadingBookDetail(bookRef);
      thumbnailOptions = collectThumbnailOptions(detail);
    } catch (error) {
      thumbnailOptions = [];
      thumbnailsError =
        error instanceof Error
          ? error.message
          : "썸네일 목록을 불러오지 못했습니다.";
    } finally {
      thumbnailsLoading = false;
    }
  }

  $effect(() => {
    if (thumbnailOptionsBookRef === formData.bookRef) {
      return;
    }

    void loadThumbnailOptions(formData.bookRef);
  });

  function handleSelectThumbnail(
    event: MouseEvent,
    picture: ReadingPicture | null,
  ) {
    event.preventDefault();

    formData = {
      ...formData,
      thumbnail: picture,
    };
  }

  function isSelectedThumbnail(picture: ReadingPicture): boolean {
    const current = formData.thumbnail;

    return Boolean(
      current &&
        current.picSeq === picture.picSeq &&
        current.genName === picture.genName,
    );
  }

  async function handleSave() {
    if (!formData.singTitle?.trim()) {
      alert("노래 제목을 입력하세요.");
      return;
    }

    if ((formData.numOfCols ?? 0) <= 0) {
      alert("컬럼 수는 1 이상의 값이어야 합니다.");
      return;
    }

    savePending = true;

    try {
      if (isEditing) {
        await restApi.updateSingingSong(formData);
      } else {
        await restApi.createSingingSong(formData);
      }

      onSave();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : isEditing
            ? "노래 수정 요청에 실패했습니다."
            : "노래 저장 요청에 실패했습니다.",
      );
    } finally {
      savePending = false;
    }
  }
</script>

<div class="editor-container">
  <div class="header">
    <h1>{song ? "노래 편집" : "노래 추가"}</h1>
    <div class="header-actions">
      <button class="btn-cancel" onclick={onCancel} disabled={savePending}>
        취소
      </button>
      <button
        class="btn-save"
        onclick={() => void handleSave()}
        disabled={savePending}
      >
        {#if savePending}
          {isEditing ? "수정 중..." : "저장 중..."}
        {:else}
          {isEditing ? "수정" : "저장"}
        {/if}
      </button>
    </div>
  </div>

  <div class="form-section">
    <h2>
      <span class="song-title">{song?.singTitle}</span><span class="seq"
        >#{song?.bookRef}</span
      >
    </h2>
    <div class="form-group">
      <label for="song-title">노래 제목</label>
      <input
        id="song-title"
        type="text"
        bind:value={formData.singTitle}
        placeholder="노래 제목을 입력하세요"
      />
    </div>

    <div class="form-group">
      <label for="original-video-url">원본 동영상 링크</label>
      <input
        id="original-video-url"
        type="url"
        bind:value={formData.singUrl}
        placeholder="https://youtu.be/..."
      />
    </div>

    <div class="form-group">
      <label for="song-cols">컬럼 수</label>
      <input
        id="song-cols"
        type="number"
        min="1"
        step="1"
        bind:value={formData.numOfCols}
      />
    </div>

    <div class="form-group">
      <p class="section-label">썸네일 선택</p>

      {#if thumbnailsLoading}
        <p class="thumbnail-message">썸네일 목록을 불러오는 중입니다.</p>
      {:else if thumbnailsError}
        <p class="thumbnail-message error">{thumbnailsError}</p>
      {:else if formData.bookRef === null}
        <p class="thumbnail-message">
          연결된 읽기책이 있어야 썸네일을 선택할 수 있습니다.
        </p>
      {:else if thumbnailOptions.length === 0}
        <p class="thumbnail-message">선택할 수 있는 그림이 없습니다.</p>
      {:else}
        <div class="thumbnail-actions">
          <button
            class:selected={!formData.thumbnail}
            class="thumbnail-clear"
            type="button"
            onclick={(event) => handleSelectThumbnail(event, null)}
          >
            썸네일 없음
          </button>
        </div>
        <div class="thumbnail-grid">
          {#each thumbnailOptions as picture (`${picture.picSeq}-${picture.genName}`)}
            <button
              type="button"
              class:selected={isSelectedThumbnail(picture)}
              class="thumbnail-option"
              onclick={(event) => handleSelectThumbnail(event, picture)}
            >
              <Symbol
                imageUrl={resolvePictureUrl(picture)}
                text={picture.wordName || picture.picName}
                width={40}
                descSize="1rem"
              />
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .editor-container {
    max-width: 600px;
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
    font-size: 1.8rem;
    color: #333;
  }
  h2 .seq {
    color: #666;
    font-weight: 400;
    font-size: 1.4rem;
    background-color: #efefef;
    padding: 2px 8px;
    border-radius: 4px;
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

  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
    text-align: left;
  }

  .section-label {
    display: block;
    margin: 0 0 8px 0;
    font-weight: bold;
    color: #555;
  }

  .form-group input[type="text"],
  .form-group input[type="url"],
  .form-group input[type="number"] {
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

  .form-group input:disabled {
    background: #f3f4f6;
    color: #6b7280;
  }

  .thumbnail-message {
    margin: 0;
    color: #6b7280;
  }

  .thumbnail-message.error {
    color: #dc2626;
  }

  .thumbnail-actions {
    margin-bottom: 12px;
  }

  .thumbnail-clear {
    padding: 10px 14px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    background: #fff;
    cursor: pointer;
    font: inherit;
  }

  .thumbnail-clear.selected {
    border-color: #2563eb;
    background: #dbeafe;
    color: #1d4ed8;
  }

  .thumbnail-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0px;
  }

  .thumbnail-option {
    flex: 0 0 auto;
    padding: 0px;
    border: 0px solid #e5e7eb;
    border-radius: 14px;
    background: #fff;
    cursor: pointer;
    transition:
      border-color 0.2s,
      background 0.2s,
      transform 0.2s;
  }

  .thumbnail-option:hover {
    transform: translateY(-2px);
  }

  .thumbnail-option.selected {
    border-color: #2563eb;
    background: #eff6ff;
  }
</style>
