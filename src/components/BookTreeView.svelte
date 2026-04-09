<script lang="ts">
  import { untrack } from "svelte";
  import ReadingTreeNode from "./ReadingTreeNode.svelte";
  import { restApi } from "../lib/api";
  import { songApi } from "../lib/song-api";
  import type {
    ReadingTreeBookNode,
    ReadingTreeFolderNode,
    SelectedReadingBook,
  } from "../types";

  interface Props {
    initialTree: ReadingTreeFolderNode | null;
    closeModal?: () => void;
    onSelectBook?: (selectedBook: SelectedReadingBook) => void;
    modalContext?: { updateModalProps: (props: Record<string, unknown>) => void };
  }

  let {
    initialTree,
    closeModal = () => {},
    onSelectBook = () => {},
    modalContext,
  }: Props = $props();

  let readingTree = $state<ReadingTreeFolderNode | null>(null);
  let readingTreeError = $state("");
  let readingTreeLoading = $state(false);
  let selectedBookSeq = $state<number | null>(null);
  let selectedBookLoading = $state(false);
  let selectedBookName = $state("");
  let selectedParagraphCount = $state<number | null>(null);
  let expandedFolders = $state(new Set<number>());

  function collectExpandedFolders(
    node: ReadingTreeFolderNode,
    target: Set<number>,
  ) {
    target.add(node.seq);

    node.children.forEach((child) => {
      if (child.kind === "folder") {
        collectExpandedFolders(child, target);
      }
    });
  }

  function findFolderByName(
    node: ReadingTreeFolderNode,
    name: string,
  ): ReadingTreeFolderNode | null {
    if (node.name === name) return node;
    for (const child of node.children) {
      if (child.kind === "folder") {
        const found = findFolderByName(child, name);
        if (found) return found;
      }
    }
    return null;
  }

  function applyTree(tree: ReadingTreeFolderNode | null) {
    const target = tree ? (findFolderByName(tree, "노래") ?? tree) : null;
    readingTree = target;

    const nextExpandedFolders = new Set<number>();
    if (target) {
      collectExpandedFolders(target, nextExpandedFolders);
    }
    expandedFolders = nextExpandedFolders;
  }

  async function refreshTree() {
    readingTreeLoading = true;
    readingTreeError = "";

    try {
      const tree = await restApi.getReadingCategoryTree();
      applyTree(tree);
    } catch (error) {
      readingTreeError =
        error instanceof Error
          ? error.message
          : "책 목록을 불러오지 못했습니다.";
    } finally {
      readingTreeLoading = false;
    }
  }

  function handleToggleFolder(seq: number) {
    const next = new Set(expandedFolders);

    if (next.has(seq)) {
      next.delete(seq);
    } else {
      next.add(seq);
    }

    expandedFolders = next;
  }

  async function handleSelectBook(node: ReadingTreeBookNode) {
    selectedBookSeq = node.seq;
    selectedBookLoading = true;
    readingTreeError = "";

    try {
      const detail = await restApi.getReadingBookDetail(node.seq);

      if (!detail.success) {
        throw new Error("책 내용을 불러오지 못했습니다.");
      }

      const song = songApi.createSingingDraft(detail, {
        bookName: detail.bookName,
        bookSeq: node.seq,
      });

      selectedBookName = detail.bookName;
      selectedParagraphCount = detail.paras.length;
      onSelectBook({
        treeNode: node,
        detail,
        song,
      });
      closeModal();
    } catch (error) {
      readingTreeError =
        error instanceof Error
          ? error.message
          : "책 내용을 불러오지 못했습니다.";
    } finally {
      selectedBookLoading = false;
    }
  }

  $effect(() => {
    applyTree(initialTree);
  });

  $effect(() => {
    const loading = readingTreeLoading;
    untrack(() => {
      modalContext?.updateModalProps({
        onRefresh: refreshTree,
        onRefreshLoading: loading,
      });
    });
  });
</script>

<div class="book-tree-view">
  {#if selectedBookSeq && selectedBookName}
    <p class="selection-summary">
      선택한 책: {selectedBookName}
      {#if selectedParagraphCount !== null}
        ({selectedParagraphCount}개 문단)
      {/if}
    </p>
  {/if}

  {#if readingTreeError}
    <p class="error-message">{readingTreeError}</p>
  {:else if readingTreeLoading && !readingTree}
    <p class="empty-message">책 목록을 불러오는 중입니다.</p>
  {:else if readingTree}
    <div class="tree-card">
      <ReadingTreeNode
        node={readingTree}
        {expandedFolders}
        onToggleFolder={handleToggleFolder}
        onSelectBook={handleSelectBook}
      />
    </div>
  {:else}
    <p class="empty-message">표시할 책 목록이 없습니다.</p>
  {/if}

  {#if selectedBookLoading}
    <p class="empty-message">선택한 책의 내용을 불러오는 중입니다.</p>
  {/if}
</div>

<style>
  .book-tree-view {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .tree-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .error-message {
    margin: 0;
    color: #b91c1c;
    font-size: 14px;
  }

  .selection-summary {
    margin: 0;
    color: #1f2937;
    font-size: 14px;
    font-weight: 600;
  }

  .empty-message {
    margin: 0;
    color: #6b7280;
    font-size: 14px;
  }

</style>
