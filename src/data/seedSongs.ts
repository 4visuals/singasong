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
          { id: 'w1-1-1', text: '산에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Made/025abea9-924f-4d18-86fa-5975286a2a22.png', startTime: 9.39, endTime: 10.37 },
          { id: 'w1-1-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 10.37, endTime: 11.24 },
          { id: 'w1-1-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 11.24, endTime: 13.07 }
        ]
      },
      // 1절 - 2
      {
        id: 'verse-1-2',
        startTime: 13.07,
        endTime: 16.64,
        words: [
          { id: 'w1-2-1', text: '들에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/baf0b46e-4656-4533-9f1b-1f7e8ef3e1ea.png', startTime: 13.07, endTime: 13.98 },
          { id: 'w1-2-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 13.98, endTime: 14.85 },
          { id: 'w1-2-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 14.85, endTime: 16.64 }
        ]
      },
      // 1절 - 3
      {
        id: 'verse-1-3',
        startTime: 16.64,
        endTime: 20.21,
        words: [
          { id: 'w1-3-1', text: '길가에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/387390b4-5177-47ca-9e95-34b2b2b78855.png', startTime: 16.64, endTime: 17.57 },
          { id: 'w1-3-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 17.57, endTime: 18.48 },
          { id: 'w1-3-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 18.48, endTime: 20.21 }
        ]
      },
      // 1절 - 4
      {
        id: 'verse-1-4',
        startTime: 20.21,
        endTime: 23.94,
        words: [
          { id: 'w1-4-1', text: '모두 다', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/fbccd47f-b4b9-48dd-bfd5-cb179f1e57d3.png', startTime: 20.21, endTime: 21.22 },
          { id: 'w1-4-2', text: '꽃이야', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 21.22, endTime: 23.94 }
        ]
      },
      // 1절 - 5
      {
        id: 'verse-1-5',
        startTime: 23.94,
        endTime: 27.57,
        words: [
          { id: 'w1-5-1', text: '아무데나', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Soy/b5290ff9-2993-40bf-8621-0a3a010f9401.jpg', startTime: 23.94, endTime: 25.76 },
          { id: 'w1-5-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 25.76, endTime: 27.57 }
        ]
      },
      // 1절 - 6
      {
        id: 'verse-1-6',
        startTime: 27.57,
        endTime: 31.24,
        words: [
          { id: 'w1-6-1', text: '생긴 대로', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Son/af6a56b3-0500-4596-89ba-842fc3aa549b.png', startTime: 27.57, endTime: 29.43 },
          { id: 'w1-6-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 29.43, endTime: 31.24 }
        ]
      },
      // 1절 - 7
      {
        id: 'verse-1-7',
        startTime: 31.24,
        endTime: 34.86,
        words: [
          { id: 'w1-7-1', text: '이름', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/99032bde-5a2a-48cf-b926-e316deaf2ce5.png', startTime: 31.24, endTime: 32.13 },
          { id: 'w1-7-2', text: '없이', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1cccd3e1-2fba-4f5f-84aa-c1a904567091.png', startTime: 32.13, endTime: 33.05 },
          { id: 'w1-7-3', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 33.05, endTime: 34.86 }
        ]
      },
      // 1절 - 8
      {
        id: 'verse-1-8',
        startTime: 34.86,
        endTime: 38.49,
        words: [
          { id: 'w1-8-1', text: '모두 다', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/fbccd47f-b4b9-48dd-bfd5-cb179f1e57d3.png', startTime: 34.86, endTime: 35.76 },
          { id: 'w1-8-2', text: '꽃이야', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 35.76, endTime: 38.49 }
        ]
      },
      // 2절 - 1
      {
        id: 'verse-2-1',
        startTime: 38.49,
        endTime: 42.09,
        words: [
          { id: 'w2-1-1', text: '봄에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/d8d1ca05-3a75-4047-ba5c-c6c679bd633c.png', startTime: 38.49, endTime: 39.45 },
          { id: 'w2-1-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 39.45, endTime: 40.29 },
          { id: 'w2-1-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 40.29, endTime: 42.09 }
        ]
      },
      // 2절 - 2
      {
        id: 'verse-2-2',
        startTime: 42.09,
        endTime: 45.72,
        words: [
          { id: 'w2-2-1', text: '여름에', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/ArE/e9c66505-8e65-422c-aeab-642adbe53ca5.png', startTime: 42.09, endTime: 43.065 },
          { id: 'w2-2-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 43.065, endTime: 43.95 },
          { id: 'w2-2-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 43.95, endTime: 45.72 }
        ]
      },
      // 2절 - 3
      {
        id: 'verse-2-3',
        startTime: 45.72,
        endTime: 49.46,
        words: [
          { id: 'w2-3-1', text: '몰래', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/9a421344-6d14-405a-aa4b-c139379f816e.png', startTime: 45.72, endTime: 46.68 },
          { id: 'w2-3-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 46.68, endTime: 47.63 },
          { id: 'w2-3-3', text: '꽃이고', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 47.63, endTime: 49.46 }
        ]
      },
      // 2절 - 4
      {
        id: 'verse-2-4',
        startTime: 49.46,
        endTime: 53.04,
        words: [
          { id: 'w2-4-1', text: '모두 다', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/fbccd47f-b4b9-48dd-bfd5-cb179f1e57d3.png', startTime: 49.46, endTime: 50.34 },
          { id: 'w2-4-2', text: '꽃이야', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 50.34, endTime: 53.04 }
        ]
      },
      // 2절 - 5
      {
        id: 'verse-2-5',
        startTime: 53.04,
        endTime: 56.65,
        words: [
          { id: 'w2-5-1', text: '아무데나', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Soy/b5290ff9-2993-40bf-8621-0a3a010f9401.jpg', startTime: 53.04, endTime: 54.93 },
          { id: 'w2-5-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 54.93, endTime: 56.65 }
        ]
      },
      // 2절 - 6
      {
        id: 'verse-2-6',
        startTime: 56.65,
        endTime: 60.32,
        words: [
          { id: 'w2-6-1', text: '생긴 대로', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Son/af6a56b3-0500-4596-89ba-842fc3aa549b.png', startTime: 56.65, endTime: 58.53 },
          { id: 'w2-6-2', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 58.53, endTime: 60.32 }
        ]
      },
      // 2절 - 7
      {
        id: 'verse-2-7',
        startTime: 60.32,
        endTime: 63.96,
        words: [
          { id: 'w2-7-1', text: '이름', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/99032bde-5a2a-48cf-b926-e316deaf2ce5.png', startTime: 60.32, endTime: 61.09 },
          { id: 'w2-7-2', text: '없이', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1cccd3e1-2fba-4f5f-84aa-c1a904567091.png', startTime: 61.09, endTime: 62.13 },
          { id: 'w2-7-3', text: '피어도', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ewha/8287e52f-1307-4fd4-99bd-ebc7857f6845.png', startTime: 62.13, endTime: 63.96 }
        ]
      },
      // 2절 - 8
      {
        id: 'verse-2-8',
        startTime: 63.96,
        endTime: 76.63,
        words: [
          { id: 'w2-8-1', text: '모두 다', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Tesis/fbccd47f-b4b9-48dd-bfd5-cb179f1e57d3.png', startTime: 63.96, endTime: 64.89 },
          { id: 'w2-8-2', text: '꽃이야', imageUrl: 'https://kr.object.ncloudstorage.com/aacweb/symbols/after/Ara/1811beb8-7ca1-4aa9-99c1-67244b5081f0.png', startTime: 64.89, endTime: 76.63 }
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
  }
];
