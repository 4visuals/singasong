<script lang="ts">
  import SelfReadingTreeNode from "./ReadingTreeNode.svelte";
  import type {
    ReadingTreeBookNode,
    ReadingTreeFolderNode,
    ReadingTreeNode as ReadingTreeDataNode,
  } from "../types";

  interface Props {
    node: ReadingTreeDataNode;
    depth?: number;
    expandedFolders: Set<number>;
    onToggleFolder: (seq: number) => void;
    onSelectBook?: (node: ReadingTreeBookNode) => void;
  }

  let {
    node,
    depth = 0,
    expandedFolders,
    onToggleFolder,
    onSelectBook = () => {},
  }: Props = $props();

  function getFolderNode(): ReadingTreeFolderNode | null {
    return node.kind === "folder" ? node : null;
  }

  function isExpandedFolder(folderNode: ReadingTreeFolderNode | null) {
    return folderNode ? expandedFolders.has(folderNode.seq) : false;
  }

  function handleToggle() {
    const folderNode = getFolderNode();

    if (folderNode) {
      onToggleFolder(folderNode.seq);
    }
  }

  function handleBookSelect() {
    if (node.kind === "book") {
      onSelectBook(node);
    }
  }

  function formatDate(timestamp: number) {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(timestamp));
  }
</script>

<div class="tree-node" style={`--depth:${depth}`}>
  {#if node.kind === "folder"}
    {@const folderNode = getFolderNode()}
    {@const expanded = isExpandedFolder(folderNode)}

    <button class="tree-row folder" onclick={handleToggle} type="button">
      <span class="arrow">{expanded ? "▾" : "▸"}</span>
      <span class="icon">폴더</span>
      <span class="label">{node.name}</span>
      <span class="meta">{node.children.length}개 항목</span>
    </button>

    {#if expanded}
      <div class="children">
        {#each node.children as child (child.kind + ":" + child.seq)}
          <SelfReadingTreeNode
            node={child}
            depth={depth + 1}
            {expandedFolders}
            {onToggleFolder}
            {onSelectBook}
          />
        {/each}
      </div>
    {/if}
  {:else}
    <button class="tree-row book" onclick={handleBookSelect} type="button">
      <span class="arrow spacer"></span>
      <span class="icon">책</span>
      <span class="label">{node.name}</span>
      <span class="meta">{formatDate(node.resource.generatedTime)}</span>
    </button>
  {/if}
</div>

<style>
  .tree-node {
    --indent: calc(var(--depth) * 18px);
  }

  .tree-row {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px 10px calc(12px + var(--indent));
    border: 0;
    border-radius: 10px;
    background: transparent;
    color: #1f2937;
    text-align: left;
  }

  .tree-row.folder {
    cursor: pointer;
  }

  .tree-row.folder:hover,
  .tree-row.book:hover {
    background: #f3f7fb;
  }

  .tree-row.book {
    cursor: pointer;
  }

  .arrow {
    width: 16px;
    color: #64748b;
    text-align: center;
    flex: 0 0 16px;
  }

  .spacer {
    visibility: hidden;
  }

  .icon {
    flex: 0 0 auto;
    font-size: 12px;
    font-weight: 700;
    color: #2563eb;
    background: #dbeafe;
    border-radius: 999px;
    padding: 4px 8px;
  }

  .label {
    flex: 1;
    min-width: 0;
    font-size: 15px;
    font-weight: 600;
    word-break: break-word;
  }

  .meta {
    flex: 0 0 auto;
    font-size: 12px;
    color: #6b7280;
  }

  .children {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
</style>
