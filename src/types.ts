export interface Word {
  id: string;
  text: string;
  imageUrl: string;
  startTime: number;
  endTime: number;
}

export interface Verse {
  id: string;
  words: Word[];
  startTime: number;
  endTime: number;
}

export interface Song {
  id: string;
  title: string;
  originalVideoUrl: string;
  bgMusicVideoUrl: string;
  vocalAudioFile?: File | string;
  verses: Verse[];
}

export type Screen = 'list' | 'play' | 'edit';
