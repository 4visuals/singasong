<script lang="ts">
  import type { Tab } from "./index";

  export let tabs: Tab[] = [];
  export let selected: string = tabs[0]?.id ?? "common";

  function select(id: string) {
    selected = id;
  }
</script>

<div class="tabs" data-comp="Tabs">
  <div class="tab-headers">
    {#each tabs as t}
      <button
        type="button"
        class:selected={t.id === selected}
        on:click={() => select(t.id)}
      >
        {t.label}
      </button>
    {/each}
  </div>

  <div class="tab-body">
    <slot {selected} />
  </div>
</div>

<style>
  .tab-headers {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }

  .tab-headers button {
    padding: 8px 14px;
    border: 1px solid #e5e7eb;
    background: white;
    border-radius: 8px;
    cursor: pointer;
  }

  .tab-headers button.selected {
    background: #eef2ff;
    color: #1d4ed8;
    border-color: #c7d2fe;
  }

  .tab-body {
    margin-top: 8px;
  }
</style>
