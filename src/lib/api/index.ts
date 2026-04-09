// Simple API client for communicating with backend defined by VITE_BACKEND_HOST.
// In development set `VITE_BACKEND_HOST` (e.g. http://localhost:3000).
// In production leave it empty to use relative requests.

import type {
  LoginSession,
  ReadingBookResource,
  ReadingBookDetailResponse,
  ReadingCategory,
  ReadingCategoryResponse,
  ReadingTreeBookNode,
  ReadingTreeFolderNode,
  Song,
} from "../../types";

type Json = any;

export type LoginPayload = {
  userID: string;
  userPassword: string;
};

export type LoginResponse = LoginSession;

export type SingingResponse = Partial<Song>;
export type SingingMapResponse = {
  common: SingingResponse[];
  owner: SingingResponse[];
  student?: SingingResponse[];
  teacher?: SingingResponse[];
};

function buildReadingCategoryTree(
  response: ReadingCategoryResponse,
): ReadingTreeFolderNode | null {
  const categoryMap = new Map<number, ReadingCategory>();
  const childrenMap = new Map<number, ReadingCategory[]>();
  const resourceMap = new Map<number, ReadingBookResource>();

  response.cates.forEach((category) => {
    categoryMap.set(category.seq, category);
  });

  response.resources.forEach((resource) => {
    resourceMap.set(resource.seq, resource);
  });

  response.cates.forEach((category) => {
    if (category.parentSeq == null) {
      return;
    }

    const siblings = childrenMap.get(category.parentSeq) ?? [];
    siblings.push(category);
    childrenMap.set(category.parentSeq, siblings);
  });

  const buildFolderNode = (
    category: ReadingCategory,
  ): ReadingTreeFolderNode => {
    const childFolders = (childrenMap.get(category.seq) ?? [])
      .slice()
      .sort((left, right) => left.order - right.order)
      .map(buildFolderNode);

    const childBooks: ReadingTreeBookNode[] = category.resourceMappings
      .map((resourceSeq) => resourceMap.get(resourceSeq))
      .filter((resource): resource is ReadingBookResource => Boolean(resource))
      .map((resource) => ({
        kind: "book",
        seq: resource.seq,
        name: resource.bookTitle,
        resource,
      }));

    return {
      kind: "folder",
      seq: category.seq,
      name: category.categoryName,
      itemCount: category.itemCount,
      category,
      children: [...childFolders, ...childBooks],
    };
  };

  const rootCategory = response.cates.find(
    (category) => category.parentSeq == null,
  );

  if (!rootCategory) {
    return null;
  }

  return buildFolderNode(rootCategory);
}

function normalizeSong(resource: SingingResponse): Song {
  return {
    singSeq: resource.singSeq ?? null,
    singTitle: resource.singTitle ?? null,
    numOfCols: resource.numOfCols ?? null,
    singSkipLines: resource.singSkipLines ?? null,
    singUrl: resource.singUrl ?? null,
    singOrigin: resource.singOrigin ?? null,
    singCreated: resource.singCreated ?? null,
    singOwnerRef: resource.singOwnerRef ?? null,
    teacherRef: resource.teacherRef ?? null,
    bookRef: resource.bookRef ?? null,
    thumbnail: resource.thumbnail ?? null,
  };
}

export class RestApi {
  BACKEND_HOST: string;
  BASE_URL: string;
  BASE_PATH: string;
  USE_DEV_PROXY: boolean;

  constructor() {
    const RAW_BACKEND = (import.meta.env as any).VITE_BACKEND_HOST ?? "";
    this.BACKEND_HOST = String(RAW_BACKEND).trim();
    this.BASE_URL = this.BACKEND_HOST
      ? this.BACKEND_HOST.replace(/\/+$/, "")
      : "";
    this.BASE_PATH = this.resolveBasePath(this.BASE_URL);
    this.USE_DEV_PROXY = Boolean(import.meta.env.DEV && this.BACKEND_HOST);
  }

  private resolveBasePath(url: string) {
    if (!url) {
      return "";
    }

    try {
      return new URL(url).pathname.replace(/\/+$/, "");
    } catch {
      const withoutOrigin = url.replace(/^https?:\/\//, "");
      const path = withoutOrigin.split("/").slice(1).join("/");
      return path ? `/${path}` : "";
    }
  }

  private buildUrl(path: string) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    if (this.USE_DEV_PROXY) {
      return `${this.BASE_PATH}${normalizedPath}`;
    }

    if (!this.BASE_URL) return normalizedPath;

    let finalPath = normalizedPath;
    if (this.BASE_PATH && normalizedPath.startsWith(this.BASE_PATH + "/")) {
      finalPath = normalizedPath.slice(this.BASE_PATH.length);
    } else if (this.BASE_PATH && normalizedPath === this.BASE_PATH) {
      finalPath = "/";
    }

    return `${this.BASE_URL}${finalPath}`;
  }

  async request<T = Json>(path: string, opts: RequestInit = {}): Promise<T> {
    const url = this.buildUrl(path);

    const headers = new Headers(opts.headers ?? {});

    const res = await fetch(url, {
      ...opts,
      headers,
      credentials: opts.credentials ?? "include",
    });

    const text = await res.text();
    const contentType = res.headers.get("content-type") || "";
    const body: Json =
      contentType.includes("application/json") && text
        ? JSON.parse(text)
        : text;

    if (!res.ok) {
      const message =
        (body && (body.message || body.error)) ||
        res.statusText ||
        "Request failed";
      const err: any = new Error(message);
      err.status = res.status;
      err.body = body;
      throw err;
    }

    return body as T;
  }
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const body = new URLSearchParams({
      userID: payload.userID,
      userPassword: payload.userPassword,
    });

    return this.request<LoginResponse>("/loginSubmit", {
      method: "POST",
      body: body.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    });
  }

  async getReadingCategoryResponse(): Promise<ReadingCategoryResponse> {
    return this.request<ReadingCategoryResponse>("/cate/R", {
      method: "GET",
    });
  }

  async getReadingCategoryTree(): Promise<ReadingTreeFolderNode | null> {
    const response = await this.getReadingCategoryResponse();

    if (!response.success) {
      throw new Error("책 목록을 불러오지 못했습니다.");
    }

    return buildReadingCategoryTree(response);
  }

  async getReadingBookDetail(
    bookSeq: number,
  ): Promise<ReadingBookDetailResponse> {
    return this.request<ReadingBookDetailResponse>(
      `/reading/book/${bookSeq}/paras`,
      {
        method: "GET",
      },
    );
  }

  async getSingingSongs(): Promise<{
    common: Song[];
    owner: Song[];
    student: Song[];
    teacher: Song[];
  }> {
    const response = await this.request<SingingMapResponse>("/singing", {
      method: "GET",
    });

    return {
      common: (response.common ?? []).map(normalizeSong),
      owner: (response.owner ?? []).map(normalizeSong),
      student: (response.student ?? []).map(normalizeSong),
      teacher: (response.teacher ?? []).map(normalizeSong),
    };
  }

  async deleteSingingSong(singSeq: number): Promise<void> {
    await this.request(`/singing/${singSeq}`, {
      method: "DELETE",
    });
  }

  async createSingingSong(song: Song): Promise<Song> {
    const created = await this.request<SingingResponse>("/singing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        singTitle: song.singTitle?.trim() || "",
        numOfCols: song.numOfCols,
        singSkipLines: song.singSkipLines ?? 0,
        singUrl: song.singUrl?.trim() || null,
        singOrigin: song.singOrigin,
        bookRef: song.bookRef,
        thumbnailRef: song.thumbnail?.picSeq ?? null,
      }),
    });

    return normalizeSong(created);
  }

  async updateSingingSong(song: Song): Promise<void> {
    if (song.singSeq == null) {
      throw new Error("수정할 노래 식별자가 없습니다.");
    }

    await this.request(`/singing/${song.singSeq}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        singTitle: song.singTitle?.trim() || "",
        numOfCols: song.numOfCols ?? 4,
        singUrl: song.singUrl?.trim() || null,
        thumbnailRef: song.thumbnail?.picSeq ?? null,
      }),
    });
  }
}

export const restApi = new RestApi();

export default restApi;
