import type {
  ReadingBookDetailResponse,
  ReadingParagraph,
  ReadingPicture,
  Song,
  Verse,
  Word,
} from "../types";

const DEFAULT_SYMBOL_PATH =
  "https://kr.object.ncloudstorage.com/aacweb/symbols/after";

type ReadingBookSongOptions = {
  bookName?: string;
  bookSeq?: number;
  originalVideoUrl?: string | null;
};

export class ReadingBookSong {
  private readonly sortedParas: ReadingParagraph[];
  private readonly bookName: string;
  private readonly bookSeq: number | null;
  private readonly sourceVideoUrl: string;

  constructor(paras: ReadingParagraph[], options: ReadingBookSongOptions = {}) {
    this.sortedParas = [...paras].sort((left, right) => {
      if (left.orderNum === right.orderNum) {
        return left.seq - right.seq;
      }

      return left.orderNum - right.orderNum;
    });
    this.bookName =
      options.bookName ??
      this.sortedParas.find((paragraph) => paragraph.sentence.trim().length > 0)
        ?.sentence ??
      "제목없음";
    this.bookSeq = options.bookSeq ?? null;
    this.sourceVideoUrl = options.originalVideoUrl?.trim() || "";
  }

  get id(): string {
    if (this.bookSeq !== null) {
      return `reading-book-${this.bookSeq}`;
    }

    const firstParagraph = this.sortedParas[0];
    return firstParagraph
      ? `reading-book-paragraph-${firstParagraph.seq}`
      : "reading-book-empty";
  }

  get title(): string {
    return this.bookName;
  }

  get originalVideoUrl(): string {
    return this.sourceVideoUrl;
  }

  get bgMusicVideoUrl(): string | null {
    return null;
  }

  get vocalAudioFile(): File | string | undefined {
    return undefined;
  }

  get verses(): Verse[] {
    return this.sortedParas.map((paragraph) => ({
      id: `reading-verse-${paragraph.seq}`,
      words: paragraph.symbols.map((symbol) =>
        this.toWord(symbol, paragraph.seq),
      ),
    }));
  }

  private toWord(
    symbol: ReadingParagraph["symbols"][number],
    paragraphSeq: number,
  ): Word {
    return {
      id: `reading-word-${paragraphSeq}-${symbol.symbolSeq}`,
      text: symbol.token.originWord,
      imageUrl: this.resolvePictureUrl(symbol.pic),
    };
  }

  private resolvePictureUrl(picture: ReadingPicture): string {
    const symbolPath = (
      import.meta.env.VITE_SYMBOL_PATH || DEFAULT_SYMBOL_PATH
    ).replace(/\/+$/, "");
    const origin = picture.origin || "common";
    return `${symbolPath}/${origin}/${picture.genName}`;
  }
}

export class SongApi {
  resolveUri(uri: string): string {
    const songPath = import.meta.env.VITE_SONG_PATH || "";
    return songPath + uri;
  }

  createReadingBookSong(
    detail: ReadingBookDetailResponse,
    options: ReadingBookSongOptions = {},
  ) {
    return new ReadingBookSong(detail.paras, {
      bookName: options.bookName ?? detail.bookName,
      bookSeq: options.bookSeq,
      originalVideoUrl: options.originalVideoUrl,
    });
  }

  createSingingDraft(
    detail: ReadingBookDetailResponse,
    options: ReadingBookSongOptions = {},
  ): Song {
    const numOfCols = detail.paras.reduce((max, paragraph) => {
      return Math.max(max, paragraph.symbols.length);
    }, 0);

    return {
      singSeq: null,
      singTitle: (options.bookName ?? detail.bookName).trim(),
      numOfCols: numOfCols > 0 ? numOfCols : null,
      singSkipLines: 0,
      singUrl: options.originalVideoUrl?.trim() || null,
      singOrigin: options.originalVideoUrl?.trim() ? "YTB" : null,
      singCreated: null,
      singOwnerRef: null,
      teacherRef: null,
      bookRef: options.bookSeq ?? null,
      thumbnail: null,
    };
  }
}

export const songApi = new SongApi();
