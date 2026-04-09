import { seedSongs } from "../data/seedSongs";
import type { LoginSession } from "../types";

type LegacyStoredSong = (typeof seedSongs)[number];

const STORAGE_KEY = "singasong_songs";
const LOGIN_SESSION_STORAGE_KEY = "singasong_login_session";
const SEED_PREFIX = "seed-";

export function getLoginSession(): LoginSession | null {
  const stored = localStorage.getItem(LOGIN_SESSION_STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as LoginSession;
  } catch {
    localStorage.removeItem(LOGIN_SESSION_STORAGE_KEY);
    return null;
  }
}

export function saveLoginSession(session: LoginSession): void {
  localStorage.setItem(LOGIN_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearLoginSession(): void {
  localStorage.removeItem(LOGIN_SESSION_STORAGE_KEY);
}

/**
 * 모든 노래를 반환 (시드 데이터 + LocalStorage 데이터)
 */
export function getSongs(): LegacyStoredSong[] {
  const storedSongs = getLocalStorageSongs();

  // 시드 데이터와 사용자 데이터를 병합
  // 시드 데이터가 먼저 표시되도록
  return [...seedSongs, ...storedSongs];
}

/**
 * LocalStorage에 저장된 노래만 반환
 */
function getLocalStorageSongs(): LegacyStoredSong[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

/**
 * 노래가 시드 데이터인지 확인
 */
export function isSeedSong(id: string): boolean {
  return seedSongs.some((song) => song.id === id);
}

/**
 * 노래 저장 (시드 데이터는 저장 불가)
 */
export function saveSong(song: LegacyStoredSong): void {
  if (isSeedSong(song.id)) {
    throw new Error("시드 데이터는 수정할 수 없습니다.");
  }

  const songs = getLocalStorageSongs();
  const index = songs.findIndex((s) => s.id === song.id);
  if (index >= 0) {
    songs[index] = song;
  } else {
    songs.push(song);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
}

/**
 * 노래 삭제 (시드 데이터는 삭제 불가)
 */
export function deleteSong(id: string): void {
  if (isSeedSong(id)) {
    throw new Error("시드 데이터는 삭제할 수 없습니다.");
  }

  const songs = getLocalStorageSongs().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
}
