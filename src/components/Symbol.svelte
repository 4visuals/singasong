<script lang="ts">
  interface Props {
    imageUrl: string;
    text: string;
    width?: number;
    descSize?: string;
  }

  let { imageUrl, text, width = 160, descSize = "1.5rem" }: Props = $props();
</script>

<div
  class="symbol"
  style={`--symbol-width:${width}px; --symbol-desc-size:${descSize};`}
>
  <span class="pic-holder">
    {#if imageUrl}
      <img class="symbol-image" src={imageUrl} alt={text || "심볼"} />
    {:else}
      <span class="symbol-placeholder">이미지 없음</span>
    {/if}
  </span>
  <div class="desc">{text}</div>
</div>

<style>
  .symbol {
    display: inline-block;
    position: relative;
    width: var(--symbol-width);
    margin: 10px;
    z-index: 1;
  }

  .pic-holder {
    width: var(--symbol-width);
    min-height: var(--symbol-width);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition:
      width 0.2s,
      height 0.2s;
    background-color: #ffffff;
    border-radius: 12px;
    border: 2px solid #e5e7eb;
    overflow: hidden;
    z-index: -2;
  }

  .symbol-image {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  .symbol-placeholder {
    padding: 16px;
    color: #9ca3af;
    font-size: 0.95rem;
    text-align: center;
  }

  .desc {
    display: block;
    margin-top: 10px;
    text-align: center;
    font-size: var(--symbol-desc-size);
    font-weight: 600;
    color: #374151;
    word-break: keep-all;
  }
</style>
