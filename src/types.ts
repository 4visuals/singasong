export interface Word {
  id: string;
  text: string;
  imageUrl: string;
  startTime: number | null;
  endTime: number | null;
}

export interface Verse {
  id: string;
  words: Word[];
  startTime: number | null;
  endTime: number | null;
}

export interface Song {
  id: string;
  title: string;
  originalVideoUrl: string;
  bgMusicVideoUrl: string | null;
  vocalAudioFile?: File | string;
  verses: Verse[];
}

export type Screen = 'list' | 'play' | 'edit';
