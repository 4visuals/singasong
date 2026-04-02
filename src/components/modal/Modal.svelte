<script lang="ts">
  import { modalContext } from "./index";
  import type { ModalProps } from "./index";

  function handleBackdropClick() {
    if ($modalContext.closeOnBackdrop) {
      modalContext.closeModal();
    }
  }

  function handleBackdropKeydown(event: KeyboardEvent) {
    if (!$modalContext.closeOnBackdrop) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      modalContext.closeModal();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!$modalContext.open) {
      return;
    }

    if (event.key === "Escape" && $modalContext.closeOnEscape) {
      modalContext.closeModal();
    }
  }

  function resolveProps(props: ModalProps) {
    return {
      ...props,
      closeModal: modalContext.closeModal,
      modalContext,
    };
  }

  $effect(() => {
    if (!$modalContext.open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if $modalContext.open && $modalContext.component}
  {@const CurrentComponent = $modalContext.component}

  <div class="modal-shell" role="presentation">
    <div
      class="modal-backdrop"
      role="button"
      tabindex="0"
      aria-label="모달 닫기"
      onclick={handleBackdropClick}
      onkeydown={handleBackdropKeydown}
    ></div>

    <div
      class="modal-panel"
      role="dialog"
      aria-modal="true"
      aria-label={$modalContext.title || "Modal"}
      style:max-width={$modalContext.maxWidth}
      tabindex="-1"
    >
      <div class="modal-header">
        <h2>{$modalContext.title}</h2>
        <div class="modal-header-actions">
          {#if typeof $modalContext.props.onRefresh === 'function'}
            <button
              class="modal-refresh-button"
              onclick={() => ($modalContext.props.onRefresh as () => void)()}
              disabled={!!$modalContext.props.onRefreshLoading}
              type="button"
            >
              {$modalContext.props.onRefreshLoading ? "불러오는 중..." : "새로고침"}
            </button>
          {/if}
          <button
            class="modal-close-button"
            onclick={modalContext.closeModal}
            type="button"
            aria-label="닫기"
          >
            닫기
          </button>
        </div>
      </div>

      <div class="modal-body">
        <CurrentComponent {...resolveProps($modalContext.props)} />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-shell {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(15, 23, 42, 0.48);
    backdrop-filter: blur(4px);
  }

  .modal-panel {
    position: relative;
    z-index: 1;
    width: 100%;
    max-height: calc(100vh - 32px);
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.28);
    overflow: hidden;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 20px;
    border-bottom: 1px solid #e5e7eb;
  }

  .modal-header-actions {
    display: flex;
    gap: 8px;
  }

  .modal-refresh-button {
    border: 0;
    border-radius: 10px;
    padding: 10px 14px;
    font: inherit;
    font-weight: 600;
    color: #1d4ed8;
    background: #dbeafe;
    cursor: pointer;
  }

  .modal-refresh-button:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 20px;
    color: #111827;
  }

  .modal-close-button {
    border: 0;
    border-radius: 10px;
    padding: 10px 14px;
    font: inherit;
    font-weight: 600;
    color: #374151;
    background: #f3f4f6;
    cursor: pointer;
  }

  .modal-body {
    overflow: auto;
    padding: 20px;
  }

  @media (max-width: 640px) {
    .modal-shell {
      padding: 0;
      align-items: stretch;
    }

    .modal-panel {
      max-height: 100vh;
      border-radius: 0;
    }
  }
</style>
