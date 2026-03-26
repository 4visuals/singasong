import type { Song } from '../types';

/**
 * 프로그램에 기본으로 포함될 노래 데이터
 *
 * 사용 방법:
 * 1. 이 파일에 노래 데이터를 추가하면 프로그램 시작 시 자동으로 로드됩니다
 * 2. LocalStorage의 데이터와 병합되어 표시됩니다
 * 3. 여기 있는 데이터는 편집/삭제할 수 없습니다 (읽기 전용)
 *
 * 노래 추가 예시:
 * {
 *   id: 'song-1',  // 고유 ID (중복되지 않게)
 *   title: '과자 송',
 *   originalVideoUrl: 'https://youtu.be/otkjcvBaeZo',
 *   bgMusicVideoUrl: 'https://youtu.be/otkjcvBaeZo',
 *   vocalAudioFile: '/audio/vocal.mp3',  // public 폴더에 파일 넣기
 *   verses: [
 *     {
 *       id: 'verse-1',
 *       startTime: 0,
 *       endTime: 5.5,
 *       words: [
 *         {
 *           id: 'word-1',
 *           text: '과자',
 *           imageUrl: 'https://example.com/image.png',
 *           audioFile: '/audio/word1.mp3',  // 선택사항
 *           startTime: 0,
 *           endTime: 1.5
 *         }
 *       ]
 *     }
 *   ]
 * }
 */

export const seedSongs: Song[] = [
  {
    id: 'seed-bangawoyo',
    title: '반가워요',
    originalVideoUrl: 'https://youtu.be/QWM0TIRAx4k',
    bgMusicVideoUrl: null,
    verses: [
      // 1절 - 1
      {
        id: 'bv1-1',
        startTime: null,
        endTime: null,
        words: [
          { id: 'bw1-1-1', text: '반가워요', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/1fa7bcf6-d9e4-4bb3-bf0b-8a04a697c792.png', startTime: null, endTime: null },
          { id: 'bw1-1-2', text: '반가워요', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/1fa7bcf6-d9e4-4bb3-bf0b-8a04a697c792.png', startTime: null, endTime: null },
          { id: 'bw1-1-3', text: '친구들', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/64a40efb-4c83-4720-9947-e5d4cf3199dd.png', startTime: null, endTime: null }
        ]
      },
      // 1절 - 2
      {
        id: 'bv1-2',
        startTime: null,
        endTime: null,
        words: [
          { id: 'bw1-2-1', text: '반가워요', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/1fa7bcf6-d9e4-4bb3-bf0b-8a04a697c792.png', startTime: null, endTime: null },
          { id: 'bw1-2-2', text: '반가워요', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/1fa7bcf6-d9e4-4bb3-bf0b-8a04a697c792.png', startTime: null, endTime: null },
          { id: 'bw1-2-3', text: '친구들', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/64a40efb-4c83-4720-9947-e5d4cf3199dd.png', startTime: null, endTime: null }
        ]
      },
      // 1절 - 3
      {
        id: 'bv1-3',
        startTime: null,
        endTime: null,
        words: [
          { id: 'bw1-3-1', text: '반가워요', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/1fa7bcf6-d9e4-4bb3-bf0b-8a04a697c792.png', startTime: null, endTime: null },
          { id: 'bw1-3-2', text: '반가워요', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/1fa7bcf6-d9e4-4bb3-bf0b-8a04a697c792.png', startTime: null, endTime: null },
          { id: 'bw1-3-3', text: '친구들', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/64a40efb-4c83-4720-9947-e5d4cf3199dd.png', startTime: null, endTime: null }
        ]
      },
      // 1절 - 4
      {
        id: 'bv1-4',
        startTime: null,
        endTime: null,
        words: [
          { id: 'bw1-4-1', text: '도레미', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/USER/1ff4389e-9532-4bdc-b9d2-10da74a676b9.png', startTime: null, endTime: null },
          { id: 'bw1-4-2', text: '팡팡', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/USER/512b8c1b-a732-4f8a-9074-531a87722e2c.png', startTime: null, endTime: null }
        ]
      },
      // 2절 - 1
      {
        id: 'bv2-1',
        startTime: null,
        endTime: null,
        words: [
          { id: 'bw2-1-1', text: '반가워요', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/1fa7bcf6-d9e4-4bb3-bf0b-8a04a697c792.png', startTime: null, endTime: null },
          { id: 'bw2-1-2', text: '반가워요', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/1fa7bcf6-d9e4-4bb3-bf0b-8a04a697c792.png', startTime: null, endTime: null },
          { id: 'bw2-1-3', text: '선생님', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/9d46e618-4e88-4cb5-b1f8-fb47043bec96.png', startTime: null, endTime: null }
        ]
      },
      // 2절 - 2
      {
        id: 'bv2-2',
        startTime: null,
        endTime: null,
        words: [
          { id: 'bw2-2-1', text: '반가워요', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/1fa7bcf6-d9e4-4bb3-bf0b-8a04a697c792.png', startTime: null, endTime: null },
          { id: 'bw2-2-2', text: '반가워요', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/1fa7bcf6-d9e4-4bb3-bf0b-8a04a697c792.png', startTime: null, endTime: null },
          { id: 'bw2-2-3', text: '선생님', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/9d46e618-4e88-4cb5-b1f8-fb47043bec96.png', startTime: null, endTime: null }
        ]
      },
      // 2절 - 3
      {
        id: 'bv2-3',
        startTime: null,
        endTime: null,
        words: [
          { id: 'bw2-3-1', text: '반가워요', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/1fa7bcf6-d9e4-4bb3-bf0b-8a04a697c792.png', startTime: null, endTime: null },
          { id: 'bw2-3-2', text: '반가워요', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/1fa7bcf6-d9e4-4bb3-bf0b-8a04a697c792.png', startTime: null, endTime: null },
          { id: 'bw2-3-3', text: '선생님', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/9d46e618-4e88-4cb5-b1f8-fb47043bec96.png', startTime: null, endTime: null }
        ]
      },
      // 2절 - 4
      {
        id: 'bv2-4',
        startTime: null,
        endTime: null,
        words: [
          { id: 'bw2-4-1', text: '도레미', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/USER/1ff4389e-9532-4bdc-b9d2-10da74a676b9.png', startTime: null, endTime: null },
          { id: 'bw2-4-2', text: '팡팡', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/USER/512b8c1b-a732-4f8a-9074-531a87722e2c.png', startTime: null, endTime: null }
        ]
      }
    ]
  },
  {
    id: 'seed-modu-da-kkochiya',
    title: '모두 다 꽃이야',
    originalVideoUrl: 'https://youtu.be/P9u5wxrHUvk',
    bgMusicVideoUrl: 'https://youtu.be/gw7jwD96JCo',
  //  vocalAudioFile: '/audio/todoFlores_vocal.mp3',
    vocalAudioFile: 'https://kr.object.ncloudstorage.com/tesis/media/todoFlores_vocals.mp3',
    verses: [
      // 1절 - 1
      {
        id: 'verse-1-1',
        startTime: 9.39,
        endTime: 13.07,
        words: [
          { id: 'w1-1-1', text: '산에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Made/025abea9-924f-4d18-86fa-5975286a2a22.png', startTime: 9.39, endTime: 10.00 },
          { id: 'w1-1-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 10.37, endTime: 11.00 },
          { id: 'w1-1-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 11.24, endTime: 12.80 }
        ]
      },
      // 1절 - 2
      {
        id: 'verse-1-2',
        startTime: 13.07,
        endTime: 16.64,
        words: [
          { id: 'w1-2-1', text: '들에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/baf0b46e-4656-4533-9f1b-1f7e8ef3e1ea.png', startTime: 13.07, endTime: 13.50 },
          { id: 'w1-2-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 13.98, endTime: 14.55 },
          { id: 'w1-2-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 14.85, endTime: 16.40 }
        ]
      },
      // 1절 - 3
      {
        id: 'verse-1-3',
        startTime: 16.64,
        endTime: 20.21,
        words: [
          { id: 'w1-3-1', text: '길가에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/387390b4-5177-47ca-9e95-34b2b2b78855.png', startTime: 16.85, endTime: 17.65 },
          { id: 'w1-3-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 17.75, endTime: 18.40 },
          { id: 'w1-3-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 18.48, endTime: 20.00 }
        ]
      },
      // 1절 - 4
      {
        id: 'verse-1-4',
        startTime: 20.21,
        endTime: 23.94,
        words: [
          { id: 'w1-4-1', text: '모두 다', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/fbccd47f-b4b9-48dd-bfd5-cb179f1e57d3.png', startTime: 20.21, endTime: 20.80 },
          { id: 'w1-4-2', text: '꽃이야', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 21.22, endTime: 23.60 }
        ]
      },
      // 1절 - 5
      {
        id: 'verse-1-5',
        startTime: 23.94,
        endTime: 27.57,
        words: [
          { id: 'w1-5-1', text: '아무데나', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Soy/b5290ff9-2993-40bf-8621-0a3a010f9401.jpg', startTime: 24.10, endTime: 25.84 },
          { id: 'w1-5-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 25.76, endTime: 27.20 }
        ]
      },
      // 1절 - 6
      {
        id: 'verse-1-6',
        startTime: 27.57,
        endTime: 31.24,
        words: [
          { id: 'w1-6-1', text: '생긴 대로', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Son/af6a56b3-0500-4596-89ba-842fc3aa549b.png', startTime: 27.57, endTime: 29.35 },
          { id: 'w1-6-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 29.60, endTime: 31.24 }
        ]
      },
      // 1절 - 7
      {
        id: 'verse-1-7',
        startTime: 31.24,
        endTime: 34.86,
        words: [
          { id: 'w1-7-1', text: '이름', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/99032bde-5a2a-48cf-b926-e316deaf2ce5.png', startTime: 31.24, endTime: 31.90 },
          { id: 'w1-7-2', text: '없이', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1cccd3e1-2fba-4f5f-84aa-c1a904567091.png', startTime: 32.13, endTime: 32.85 },
          { id: 'w1-7-3', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 33.15, endTime: 34.86 }
        ]
      },
      // 1절 - 8
      {
        id: 'verse-1-8',
        startTime: 34.86,
        endTime: 38.49,
        words: [
          { id: 'w1-8-1', text: '모두 다', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/fbccd47f-b4b9-48dd-bfd5-cb179f1e57d3.png', startTime: 34.86, endTime: 35.85 },
          { id: 'w1-8-2', text: '꽃이야', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 36.40, endTime: 38.49 }
        ]
      },
      // 2절 - 1
      {
        id: 'verse-2-1',
        startTime: 38.49,
        endTime: 42.09,
        words: [
          { id: 'w2-1-1', text: '봄에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/d8d1ca05-3a75-4047-ba5c-c6c679bd633c.png', startTime: 38.49, endTime: 39.05 },
          { id: 'w2-1-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 39.45, endTime: 40.00 },
          { id: 'w2-1-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 40.29, endTime: 41.79 }
        ]
      },
      // 2절 - 2
      {
        id: 'verse-2-2',
        startTime: 42.09,
        endTime: 45.72,
        words: [
          { id: 'w2-2-1', text: '여름에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/e9c66505-8e65-422c-aeab-642adbe53ca5.png', startTime: 42.09, endTime: 42.70 },
          { id: 'w2-2-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 42.90, endTime: 43.60 },
          { id: 'w2-2-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 43.95, endTime: 45.40 }
        ]
      },
      // 2절 - 3
      {
        id: 'verse-2-3',
        startTime: 45.72,
        endTime: 49.46,
        words: [
          { id: 'w2-3-1', text: '몰래', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/9a421344-6d14-405a-aa4b-c139379f816e.png', startTime: 45.80, endTime: 46.68 },
          { id: 'w2-3-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 47.10, endTime: 47.70 },
          { id: 'w2-3-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 47.75, endTime: 49.20 }
        ]
      },
      // 2절 - 4
      {
        id: 'verse-2-4',
        startTime: 49.46,
        endTime: 53.04,
        words: [
          { id: 'w2-4-1', text: '모두 다', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/fbccd47f-b4b9-48dd-bfd5-cb179f1e57d3.png', startTime: 49.40, endTime: 49.90 },
          { id: 'w2-4-2', text: '꽃이야', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 50.10, endTime: 52.50 }
        ]
      },
      // 2절 - 5
      {
        id: 'verse-2-5',
        startTime: 53.04,
        endTime: 56.65,
        words: [
          { id: 'w2-5-1', text: '아무데나', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Soy/b5290ff9-2993-40bf-8621-0a3a010f9401.jpg', startTime: 53.04, endTime: 54.93 },
          { id: 'w2-5-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 54.93, endTime: 56.00 }
        ]
      },
      // 2절 - 6
      {
        id: 'verse-2-6',
        startTime: 56.65,
        endTime: 60.32,
        words: [
          { id: 'w2-6-1', text: '생긴 대로', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Son/af6a56b3-0500-4596-89ba-842fc3aa549b.png', startTime: 56.75, endTime: 58.25 },
          { id: 'w2-6-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 58.60, endTime: 60.00 }
        ]
      },
      // 2절 - 7
      {
        id: 'verse-2-7',
        startTime: 60.32,
        endTime: 63.96,
        words: [
          { id: 'w2-7-1', text: '이름', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/99032bde-5a2a-48cf-b926-e316deaf2ce5.png', startTime: 60.32, endTime: 61.20 },
          { id: 'w2-7-2', text: '없이', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1cccd3e1-2fba-4f5f-84aa-c1a904567091.png', startTime: 61.50, endTime: 62.20 },
          { id: 'w2-7-3', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 62.50, endTime: 63.96 }
        ]
      },
      // 2절 - 8
      {
        id: 'verse-2-8',
        startTime: 63.96,
        endTime: 76.63,
        words: [
          { id: 'w2-8-1', text: '모두 다', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/fbccd47f-b4b9-48dd-bfd5-cb179f1e57d3.png', startTime: 64.20, endTime: 64.89 },
          { id: 'w2-8-2', text: '꽃이야', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 65.20, endTime: 70.11 }
        ]
      },
      // 3절 - 1
      {
        id: 'verse-3-1',
        startTime: 76.63,
        endTime: 80.30,
        words: [
          { id: 'w3-1-1', text: '산에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Made/025abea9-924f-4d18-86fa-5975286a2a22.png', startTime: 76.63, endTime: 77.59 },
          { id: 'w3-1-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 77.59, endTime: 78.51 },
          { id: 'w3-1-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 78.51, endTime: 80.30 }
        ]
      },
      // 3절 - 2
      {
        id: 'verse-3-2',
        startTime: 80.30,
        endTime: 83.935,
        words: [
          { id: 'w3-2-1', text: '들에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/baf0b46e-4656-4533-9f1b-1f7e8ef3e1ea.png', startTime: 80.30, endTime: 81.25 },
          { id: 'w3-2-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 81.25, endTime: 82.09 },
          { id: 'w3-2-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 82.09, endTime: 83.935 }
        ]
      },
      // 3절 - 3
      {
        id: 'verse-3-3',
        startTime: 83.935,
        endTime: 87.51,
        words: [
          { id: 'w3-3-1', text: '길가에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/387390b4-5177-47ca-9e95-34b2b2b78855.png', startTime: 83.935, endTime: 84.87 },
          { id: 'w3-3-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 84.87, endTime: 85.71 },
          { id: 'w3-3-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 85.71, endTime: 87.51 }
        ]
      },
      // 3절 - 4
      {
        id: 'verse-3-4',
        startTime: 87.51,
        endTime: 91.24,
        words: [
          { id: 'w3-4-1', text: '모두 다', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/fbccd47f-b4b9-48dd-bfd5-cb179f1e57d3.png', startTime: 87.51, endTime: 88.50 },
          { id: 'w3-4-2', text: '꽃이야', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 88.50, endTime: 91.24 }
        ]
      },
      // 3절 - 5
      {
        id: 'verse-3-5',
        startTime: 91.24,
        endTime: 94.87,
        words: [
          { id: 'w3-5-1', text: '아무데나', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Soy/b5290ff9-2993-40bf-8621-0a3a010f9401.jpg', startTime: 91.24, endTime: 93.11 },
          { id: 'w3-5-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 93.11, endTime: 94.87 }
        ]
      },
      // 3절 - 6
      {
        id: 'verse-3-6',
        startTime: 94.87,
        endTime: 98.89,
        words: [
          { id: 'w3-6-1', text: '생긴 대로', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Son/af6a56b3-0500-4596-89ba-842fc3aa549b.png', startTime: 94.87, endTime: 96.69 },
          { id: 'w3-6-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 96.69, endTime: 98.89 }
        ]
      },
      // 3절 - 7
      {
        id: 'verse-3-7',
        startTime: 98.89,
        endTime: 102.09,
        words: [
          { id: 'w3-7-1', text: '이름', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/99032bde-5a2a-48cf-b926-e316deaf2ce5.png', startTime: 98.89, endTime: 98.49 },
          { id: 'w3-7-2', text: '없이', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1cccd3e1-2fba-4f5f-84aa-c1a904567091.png', startTime: 98.49, endTime: 100.27 },
          { id: 'w3-7-3', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 100.27, endTime: 102.09 }
        ]
      },
      // 3절 - 8
      {
        id: 'verse-3-8',
        startTime: 102.09,
        endTime: 103.88,
        words: [
          { id: 'w3-8-1', text: '모두 다', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/fbccd47f-b4b9-48dd-bfd5-cb179f1e57d3.png', startTime: 102.09, endTime: 103.02 },
          { id: 'w3-8-2', text: '꽃이야', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 103.02, endTime: 104.28 }
        ]
      },
      // 4절 - 1
      {
        id: 'verse-4-1',
        startTime: 103.88,
        endTime: 107.59,
        words: [
          { id: 'w4-1-1', text: '아무데나', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Soy/b5290ff9-2993-40bf-8621-0a3a010f9401.jpg', startTime: 103.88, endTime: 105.82 },
          { id: 'w4-1-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 105.82, endTime: 107.59 }
        ]
      },
      // 4절 - 2
      {
        id: 'verse-4-2',
        startTime: 107.59,
        endTime: 111.20,
        words: [
          { id: 'w4-2-1', text: '생긴 대로', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Son/af6a56b3-0500-4596-89ba-842fc3aa549b.png', startTime: 107.59, endTime: 109.45 },
          { id: 'w4-2-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 109.45, endTime: 111.20 }
        ]
      },
      // 4절 - 3
      {
        id: 'verse-4-3',
        startTime: 111.20,
        endTime: 114.92,
        words: [
          { id: 'w4-3-1', text: '이름', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/99032bde-5a2a-48cf-b926-e316deaf2ce5.png', startTime: 111.20, endTime: 112.12 },
          { id: 'w4-3-2', text: '없이', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1cccd3e1-2fba-4f5f-84aa-c1a904567091.png', startTime: 112.12, endTime: 113.05 },
          { id: 'w4-3-3', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 113.05, endTime: 114.92 }
        ]
      },
      // 4절 - 4
      {
        id: 'verse-4-4',
        startTime: 114.92,
        endTime: 116.70,
        words: [
          { id: 'w4-4-1', text: '모두 다', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/fbccd47f-b4b9-48dd-bfd5-cb179f1e57d3.png', startTime: 114.92, endTime: 115.759 },
          { id: 'w4-4-2', text: '꽃이야', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 115.759, endTime: 117.00}
        ]
      },
      // 5절 - 1
      {
        id: 'verse-5-1',
        startTime: 116.70,
        endTime: 120.24,
        words: [
          { id: 'w5-1-1', text: '아무데나', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Soy/b5290ff9-2993-40bf-8621-0a3a010f9401.jpg', startTime: 116.70, endTime: 118.38 },
          { id: 'w5-1-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 118.38, endTime: 120.24 }
        ]
      },
      // 5절 - 2
      {
        id: 'verse-5-2',
        startTime: 120.24,
        endTime: 123.84,
        words: [
          { id: 'w5-2-1', text: '생긴 대로', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Son/af6a56b3-0500-4596-89ba-842fc3aa549b.png', startTime: 120.24, endTime: 122.10 },
          { id: 'w5-2-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 122.10, endTime: 123.84 }
        ]
      },
      // 5절 - 3
      {
        id: 'verse-5-3',
        startTime: 123.84,
        endTime: 127.52,
        words: [
          { id: 'w5-3-1', text: '이름', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/99032bde-5a2a-48cf-b926-e316deaf2ce5.png', startTime: 123.84, endTime: 124.76 },
          { id: 'w5-3-2', text: '없이', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1cccd3e1-2fba-4f5f-84aa-c1a904567091.png', startTime: 124.76, endTime: 125.78 },
          { id: 'w5-3-3', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 125.78, endTime: 127.52 }
        ]
      },
      // 5절 - 4
      {
        id: 'verse-5-4',
        startTime: 127.52,
        endTime: 131.24,
        words: [
          { id: 'w5-4-1', text: '모두 다', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/fbccd47f-b4b9-48dd-bfd5-cb179f1e57d3.png', startTime: 127.52, endTime: 128.48 },
          { id: 'w5-4-2', text: '꽃이야', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 128.48, endTime: 131.24 }
        ]
      }
    ]
  },
  {
    id: 'seed-ulmyeon-an-dwae',
    title: '울면 안 돼',
    originalVideoUrl: 'https://youtu.be/mUu7wOyXbMQ',
    bgMusicVideoUrl: 'https://youtu.be/BLsKtKieAyE',
    vocalAudioFile: 'https://kr.object.ncloudstorage.com/tesis/media/dontcry_vocal.mp3',
    verses: [
      // 소절 1
      {
        id: 'verse-1',
        startTime: 14.56,
        endTime: 16.38,
        words: [
          { id: 'w1-1', text: '울면 안 돼', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/USER/43e610a4-9302-441b-95e0-002693b069e9.png', startTime: 14.56, endTime: 16.00 },
          { id: 'w1-2', text: '울면 안 돼', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/USER/43e610a4-9302-441b-95e0-002693b069e9.png', startTime: 16.38, endTime: 17.80 }
        ]
      },
      // 소절 2
      {
        id: 'verse-2',
        startTime: 18.00,
        endTime: 19.92,
        words: [
          { id: 'w2-1', text: '산타할아버지는', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1e4c9b51-bf25-48f5-81b0-1f1604a4de99.png', startTime: 18.00, endTime: 19.60 },
          { id: 'w2-2', text: '우는 애들에겐', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/d7800663-6318-4af2-beb5-5dd5259499f8.PNG', startTime: 20.20, endTime: 21.70 }
        ]
      },
      // 소절 3
      {
        id: 'verse-3',
        startTime: 21.60,
        endTime: 26.01,
        words: [
          { id: 'w3-1', text: '선물을', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/fe101e6f-16b1-4c7f-a5fb-bfda413b4079.png', startTime: 21.80, endTime: 23.40 },
          { id: 'w3-2', text: '안 주신대', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/USER/1bcf887a-587e-468f-ba29-91f72c3c1d98.png', startTime: 23.60, endTime: 27.50 }
        ]
      },
      // 소절 4
      {
        id: 'verse-4',
        startTime: 28.65,
        endTime: 30.48,
        words: [
          { id: 'w4-1', text: '산타할아버지는', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1e4c9b51-bf25-48f5-81b0-1f1604a4de99.png', startTime: 28.65, endTime: 30.40 },
          { id: 'w4-2', text: '알고 계신대', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/30dfdaf7-2b57-489e-857a-0068feac6f7d.png', startTime: 30.70, endTime: 32.00 }
        ]
      },
      // 소절 5
      {
        id: 'verse-5',
        startTime: 32.19,
        endTime: 34.05,
        words: [
          { id: 'w5-1', text: '누가', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/c27b9670-35cb-4155-bbf5-25e094e58568.png', startTime: 32.20, endTime: 32.60 },
          { id: 'w5-2', text: '착한 앤지', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/fdbcc410-cf1f-4621-afdb-b678767c9a94.png', startTime: 32.85, endTime: 34.00 },
          { id: 'w5-3', text: '나쁜 앤지', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/258ed18c-9897-4d30-982c-6b6d63199758.png', startTime: 34.05, endTime: 35.50 }
        ]
      },
      // 소절 6
      {
        id: 'verse-6',
        startTime: 35.80,
        endTime: 40.03,
        words: [
          { id: 'w6-1', text: '오늘', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/8ea95e76-34bf-4a0e-ae70-96912d6fab9b.png', startTime: 35.60, endTime: 36.55 },
          { id: 'w6-2', text: '밤에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/73fa0710-cd7a-4ef0-9a14-705973961af6.png', startTime: 36.70, endTime: 37.55 },
          { id: 'w6-3', text: '다녀가신대', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/4d8d7f87-63fa-46f3-a354-29c9fc870002.png', startTime: 37.70, endTime: 41.00 }
        ]
      },
      // 소절 7
      {
        id: 'verse-7',
        startTime: 42.83,
        endTime: 44.67,
        words: [
          { id: 'w7-1', text: '잠 잘 때나', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/98106817-dbfc-40a4-af84-d3b7986d6d7b.png', startTime: 42.83, endTime: 44.60 },
          { id: 'w7-2', text: '일어날 때', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/6fa3151e-46c2-47c4-a1b4-0b388d3c716a.png', startTime: 44.80, endTime: 46.00 }
        ]
      },
      // 소절 8
      {
        id: 'verse-8',
        startTime: 46.40,
        endTime: 48.13,
        words: [
          { id: 'w8-1', text: '짜증낼 때', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/483f7c40-a40f-467e-b755-30022f6cec74.png', startTime: 46.60, endTime: 48.00 },
          { id: 'w8-2', text: '장난할 때도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/8a86dee4-fda2-49f5-8935-b5054ff7f36d.png', startTime: 48.25, endTime: 49.50 }
        ]
      },
      // 소절 9
      {
        id: 'verse-9',
        startTime: 49.85,
        endTime: 53.88,
        words: [
          { id: 'w9-1', text: '산타할아버지는', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1e4c9b51-bf25-48f5-81b0-1f1604a4de99.png', startTime: 49.85, endTime: 52.80 },
          { id: 'w9-2', text: '모든 것을', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/49b57079-875b-41e1-b611-86996c788fb5.png', startTime: 53.10, endTime: 53.95 },
          { id: 'w9-3', text: '알고 계신대', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/30dfdaf7-2b57-489e-857a-0068feac6f7d.png', startTime: 54.00, endTime: 56.50 }
        ]
      },
      // 소절 10
      {
        id: 'verse-10',
        startTime: 57.00,
        endTime: 58.74,
        words: [
          { id: 'w10-1', text: '울면 안 돼', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/USER/43e610a4-9302-441b-95e0-002693b069e9.png', startTime: 57.00, endTime: 58.50 },
          { id: 'w10-2', text: '울면 안 돼', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/USER/43e610a4-9302-441b-95e0-002693b069e9.png', startTime: 58.74, endTime: 60.40 }
        ]
      },
      // 소절 11
      {
        id: 'verse-11',
        startTime: 60.52,
        endTime: 62.26,
        words: [
          { id: 'w11-1', text: '산타할아버지는', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1e4c9b51-bf25-48f5-81b0-1f1604a4de99.png', startTime: 60.70, endTime: 62.30 },
          { id: 'w11-2', text: '우리 마을을', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/13c21303-9658-47d5-a121-ec305439d188.png', startTime: 62.55, endTime: 63.80 }
        ]
      },
      // 소절 12
      {
        id: 'verse-12',
        startTime: 64.05,
        endTime: 71.50,
        words: [
          { id: 'w12-1', text: '오늘', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/8ea95e76-34bf-4a0e-ae70-96912d6fab9b.png', startTime: 64.05, endTime: 64.80 },
          { id: 'w12-2', text: '밤에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/73fa0710-cd7a-4ef0-9a14-705973961af6.png', startTime: 65.20, endTime: 65.83 },
          { id: 'w12-3', text: '다녀가신대', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/4d8d7f87-63fa-46f3-a354-29c9fc870002.png', startTime: 65.83, endTime: 71.50 }
        ]
      }
    ]
  }
];
