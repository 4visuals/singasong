export interface Word {
  id: string;
  text: string;
  imageUrl: string;
}

export interface Verse {
  id: string;
  words: Word[];
}

export interface Song {
  id: string;
  title: string;
  originalVideoUrl: string;
  bgMusicVideoUrl: string | null;
  vocalAudioFile?: File | string;
  verses: Verse[];
}

export interface LegacyThumbCategory {
  seq: number;
  categoryName: string;
  itemCount: number;
  parentSeq: number | null;
  order: number;
  ownerSeq: number | null;
  type: string;
  thumb: LegacyThumb | null;
  resourceMappings: number[];
}

export interface LegacyThumb {
  cate: LegacyThumbCategory;
  genName: string;
  origin: string;
  words: unknown[];
  picName: string;
  seq: number;
}

export interface ReadingCategory {
  seq: number;
  categoryName: string;
  itemCount: number;
  parentSeq: number | null;
  order: number;
  ownerSeq: number | null;
  type: string;
  thumb: LegacyThumb | null;
  resourceMappings: number[];
}

export interface ReadingBookResource {
  seq: number;
  bookTitle: string;
  generatedTime: number;
  owner: unknown | null;
  type: string;
  tempBook: boolean;
  cateSeq: number | null;
}

export interface ReadingCategoryResponse {
  cates: ReadingCategory[];
  resources: ReadingBookResource[];
  success: boolean;
}

export interface ReadingTreeFolderNode {
  kind: "folder";
  seq: number;
  name: string;
  itemCount: number;
  category: ReadingCategory;
  children: ReadingTreeNode[];
}

export interface ReadingTreeBookNode {
  kind: "book";
  seq: number;
  name: string;
  resource: ReadingBookResource;
}

export type ReadingTreeNode = ReadingTreeFolderNode | ReadingTreeBookNode;

export interface ReadingPrintOption {
  seq: number;
  optionName: string;
  optionValue: string;
  version: string;
  optionType: string;
  ownerSeq: number;
}

export interface ReadingToken {
  originWord: string;
  defaultWord: string;
  type: string;
  auxVal: string;
}

export interface ReadingPicture {
  wordSeq: number;
  wordName: string;
  picSeq: number;
  picName: string;
  type: string | null;
  genName: string;
  fileLength?: number;
  origin: string | null;
  orderNum: number;
  pumsa: string | null;
  fingerprint: string | null;
}

export interface ReadingSymbol {
  symbolSeq: number;
  token: ReadingToken;
  pic: ReadingPicture;
  symbolType: string;
}

export interface ReadingScenePicture {
  seq: number;
  sceneCates: number[];
  path: string;
  fp: string;
  orderNum: number;
  ownerSeq: number;
  referenceCount?: number | null;
}

export interface ReadingParagraph {
  seq: number;
  tokens: unknown[] | null;
  itemMap: Record<string, unknown> | null;
  sentence: string;
  symbols: ReadingSymbol[];
  scenePicture: ReadingScenePicture | null;
  orderNum: number;
  empty: boolean;
}

export interface ReadingBookDetailResponse {
  success: boolean;
  options: ReadingPrintOption[];
  paras: ReadingParagraph[];
  bookName: string;
}

export interface SelectedReadingBook {
  treeNode: ReadingTreeBookNode;
  detail: ReadingBookDetailResponse;
  song: Song;
}

export type Screen = "list" | "play" | "edit";
