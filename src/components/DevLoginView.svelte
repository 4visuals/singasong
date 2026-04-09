<script lang="ts">
  import type { SelectedReadingBook } from "../types";

  interface Props {
    loginPending: boolean;
    loginMessage: string;
    selectedReadingBook: SelectedReadingBook | null;
    onLogin: (userId: string, password: string) => Promise<boolean>;
  }

  let { loginPending, loginMessage, selectedReadingBook, onLogin }: Props =
    $props();

  let isOpen = $state(false);
  let userId = $state("");
  let password = $state("");

  function toggleOpen() {
    isOpen = !isOpen;

    if (!isOpen) {
      userId = "";
      password = "";
    }
  }

  async function handleSubmit() {
    const success = await onLogin(userId, password);

    if (!success) {
      return;
    }

    userId = "";
    password = "";
    isOpen = false;
  }
</script>

<div class="dev-login-floating" data-comp="DevLoginView">
  <button
    class="dev-login-button"
    onclick={toggleOpen}
    disabled={loginPending}
    type="button"
  >
    {isOpen ? "닫기" : "개발용 로그인"}
  </button>

  {#if isOpen}
    <div class="dev-login-panel">
      <form
        class="dev-login-form"
        onsubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        <input
          class="dev-login-input"
          type="text"
          bind:value={userId}
          placeholder="아이디"
          autocomplete="username"
          disabled={loginPending}
        />
        <input
          class="dev-login-input"
          type="password"
          bind:value={password}
          placeholder="비밀번호"
          autocomplete="current-password"
          disabled={loginPending}
        />
        <button class="dev-login-submit" type="submit" disabled={loginPending}>
          {loginPending ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {#if loginMessage}
        <p class="dev-login-message">{loginMessage}</p>
      {/if}

      {#if selectedReadingBook}
        <p class="dev-login-message">
          선택된 책: {selectedReadingBook.detail.bookName}
          ({selectedReadingBook.detail.paras.length}개 문단)
        </p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .dev-login-floating {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }

  .dev-login-button {
    border: 0;
    border-radius: 999px;
    padding: 12px 16px;
    font: inherit;
    font-weight: 600;
    color: #ffffff;
    background: #1f6feb;
    box-shadow: 0 8px 24px rgba(31, 111, 235, 0.28);
    cursor: pointer;
  }

  .dev-login-panel {
    width: min(360px, calc(100vw - 32px));
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.18);
    border: 1px solid #e2e8f0;
  }

  .dev-login-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .dev-login-input {
    width: 100%;
    min-width: 0;
    padding: 10px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    font: inherit;
  }

  .dev-login-submit {
    border: 0;
    border-radius: 10px;
    padding: 10px 14px;
    font: inherit;
    font-weight: 600;
    color: #ffffff;
    background: #16a34a;
    cursor: pointer;
  }

  .dev-login-button:disabled,
  .dev-login-submit:disabled,
  .dev-login-input:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .dev-login-message {
    margin: 0;
    color: #334155;
    font-size: 14px;
    line-height: 1.5;
  }
</style>
