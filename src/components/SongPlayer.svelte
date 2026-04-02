<script lang="ts">
  import { onMount } from 'svelte';
  import { prepareAudio, textToSpeech } from '../lib/audio';
  import type { Song, Word } from '../types';
    import { SongApi } from '../lib/song-api';

  interface Props {
    song: Song;
    onBack: () => void;
    onComplete: () => void;
  }

  const api = new SongApi()
  let { song, onBack, onComplete }: Props = $props();

  let currentVerseIndex = $state(0);
  let highlightedWordId = $state<string | null>(null);
  let showCelebration = $state(false);
  let audioControl: { play: (options?: { startTime?: number; endTime?: number }) => Promise<void> } | null = null;
  let playedWords = $state<Set<string>>(new Set());
  let playbackRate = $state(1.0);
  let showOriginalVideo = $state(true);

  onMount(() => {
    // Load vocal audio
    if (song.vocalAudioFile) {
      prepareAudio(api.resolveUri(song.vocalAudioFile as string))
        .then((control) => {
          audioControl = control;
          console.log('보컬 음원 로딩 완료');
        })
        .catch((error: unknown) => {
          console.error('보컬 음원 로딩 실패:', error);
          audioControl = null;
        });
    }
  });

  async function handleWordClick(word: Word) {
    highlightedWordId = word.id;

    // Check if this is the last word in the current verse
    const currentVerse = song.verses[currentVerseIndex];
    const isLastWord = currentVerse && currentVerse.words[currentVerse.words.length - 1].id === word.id;
    const isLastVerseLastWord = isLastWord && currentVerseIndex === song.verses.length - 1;

    // Start audio playback
    const playAudio = async () => {
      try {
        // 원본 영상이 보이는 경우: TTS 사용
        // 배경 영상이 보이는 경우: 보컬 음원 사용
        if (showOriginalVideo) {
          // 원본 영상 - TTS 모드
          console.log('Playing phrase (TTS):', {
            id: word.id,
            text: word.text,
          });
          await textToSpeech(word.text);
        } else if (audioControl) {
          // 배경 영상 - 보컬 음원 모드
          // Log phrase information to console
          console.log('Playing phrase (Vocal):', {
            id: word.id,
            text: word.text,
          });

          await audioControl.play();
        } else {
          // 보컬 음원이 없는 경우 대체 TTS
          console.log('Playing phrase (TTS fallback):', {
            id: word.id,
            text: word.text,
          });
          await textToSpeech(word.text);
        }
      } catch (error) {
        console.error('Audio playback failed:', error);
      }

      // Clear highlight after audio completes
      highlightedWordId = null;

      // If last word of last verse, show celebration after audio completes
      if (isLastVerseLastWord) {
        playedWords = new Set();
        showCelebration = true;

        // Play applause sound
        const applauseAudio = new Audio('https://kr.object.ncloudstorage.com/tesis/media/Applause.mp3');
        applauseAudio.play().catch(error => {
          console.error('Failed to play applause:', error);
        });

        setTimeout(() => {
          onComplete();
        }, 3000);
      }
    };

    // For last word of last verse, wait for audio to complete
    if (isLastVerseLastWord) {
      await playAudio();
    } else {
      // For other words, play audio in background
      playAudio();

      // If last word of non-last verse, transition to next verse after 0.5s
      if (isLastWord) {
        setTimeout(() => {
          playedWords = new Set();
          currentVerseIndex++;
        }, 500);
      } else {
        // Mark word as played (only if not last word)
        playedWords.add(word.id);
        playedWords = new Set(playedWords);
      }
    }
  }

  function goToPreviousVerse() {
    if (currentVerseIndex > 0) {
      playedWords = new Set();
      currentVerseIndex--;
    }
  }

  function goToNextVerse() {
    if (currentVerseIndex < song.verses.length - 1) {
      playedWords = new Set();
      currentVerseIndex++;
    }
  }

  function getYouTubeEmbedUrl(url: string): string {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0] ||
                    url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=0`;
  }

  function toggleVideo() {
    showOriginalVideo = !showOriginalVideo;
  }

  let currentVerse = $derived(song.verses[currentVerseIndex]);
</script>

<div class="player-container">
  <div class="header">
    <button class="btn-back" onclick={onBack}>← 목록으로</button>
    <h1>{song.title}</h1>
    {#if song.bgMusicVideoUrl}
      <button class="btn-youtube" onclick={toggleVideo}>
        <span class="youtube-icon">▶</span> {showOriginalVideo ? '반주 보기' : '원본 보기'}
      </button>
    {:else}
      <div class="btn-placeholder"></div>
    {/if}
  </div>

  {#if showCelebration}
    <div class="celebration">
      <div class="celebration-content">
        <div class="applause">👏 👏 👏</div>
        <h2>노래를 모두 불렀어요!</h2>
        <p>정말 잘했어요! 🎉</p>
      </div>
    </div>
  {:else}
    <div class="video-container">
      {#if showOriginalVideo && song.originalVideoUrl}
        <iframe
          src={getYouTubeEmbedUrl(song.originalVideoUrl)}
          title="원본 영상"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      {:else if song.bgMusicVideoUrl}
        <iframe
          src={getYouTubeEmbedUrl(song.bgMusicVideoUrl)}
          title="배경음악"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      {:else}
        <img
          class="video-placeholder"
          src="https://i.namu.wiki/i/CdZI-GqXQ0F6l8eYp8kVxCuXauV15KcsXUlLBLGaVmgaxCDRhZnb9kvhlIaIqOn_bJeOfm5Kp9kcpSafaZYzADkp7rvah5ypc0OUGQ1jJb-hJUh3NolXYEJfUhJ8ExzNQzCAcqG07hyaXM3gw-R1Eg.svg"
          alt="노래"
        />
      {/if}
    </div>

    {#if currentVerse}
      <div class="lyrics-container">
        <div class="words-grid">
          {#each currentVerse.words as word (word.id)}
            <button
              class="word-button"
              class:highlighted={highlightedWordId === word.id}
              onclick={() => handleWordClick(word)}
            >
              {#if word.imageUrl}
                <img src={word.imageUrl} alt={word.text} />
              {/if}
              <span class="word-text">{word.text}</span>
            </button>
          {/each}
        </div>

        <div class="verse-info">
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: {((currentVerseIndex + 1) / song.verses.length) * 100}%"></div>
          </div>
        </div>

        <div class="navigation-buttons">
          <button
            class="btn-nav"
            onclick={goToPreviousVerse}
            disabled={currentVerseIndex === 0}
          >
            ← 이전 소절
          </button>

          <select class="playback-rate-select" bind:value={playbackRate} disabled>
            <option value={0.5}>0.5배속</option>
            <option value={0.75}>0.75배속</option>
            <option value={0.85}>0.85배속</option>
            <option value={1.0}>1.0배속</option>
          </select>

          <button
            class="btn-nav"
            onclick={goToNextVerse}
            disabled={currentVerseIndex === song.verses.length - 1}
          >
            다음 소절 →
          </button>
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .player-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  h1 {
    margin: 0;
    font-size: 28px;
    color: #333;
  }

  .btn-back {
    padding: 10px 20px;
    font-size: 16px;
    background: #fff;
    color: #666;
    border: 2px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-back:hover {
    background: #f5f5f5;
    border-color: #999;
  }

  .btn-youtube {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    font-size: 16px;
    background: #ff0000;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-youtube:hover {
    background: #cc0000;
  }

  .btn-placeholder {
    min-width: 120px;
  }

  .youtube-icon {
    font-size: 20px;
  }

  .video-container {
    margin: 0 auto 30px;
    width: 80%;
    background: #567c8d;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .video-container iframe {
    width: 100%;
    height: 320px;
    display: block;
  }

  .video-placeholder {
    width: 100%;
    height: 320px;
    display: block;
    object-fit: contain;
  }

  .lyrics-container {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .verse-info {
    text-align: center;
    margin-bottom: 20px;
  }

  .progress-bar-container {
    width: 100%;
    height: 30px;
    background-color: #e0e0e0;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 10px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50, #8BC34A);
    transition: width 0.3s ease;
    border-radius: 15px;
    position: relative;
  }

  .progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .navigation-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .btn-nav {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background: #2196F3;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 140px;
  }

  .btn-nav:hover:not(:disabled) {
    background: #1976D2;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
  }

  .btn-nav:disabled {
    background: #cccccc;
    cursor: not-allowed;
    opacity: 0.5;
  }

  .playback-rate-select {
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    background: white;
    border: 2px solid #2196F3;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 120px;
  }

  .playback-rate-select:hover {
    background: #f5f5f5;
    border-color: #1976D2;
  }

  .playback-rate-select:focus {
    outline: none;
    border-color: #1976D2;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  }

  .words-grid {
    display: grid;
    grid-template-columns: repeat(3, 180px);
    gap: 20px;
    justify-content: center;
    margin-bottom: 30px;
    padding: 20px;
    background: #1e5773;
    border-radius: 12px;
    margin-left: auto;
    margin-right: auto;
  }

  .word-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    width: 180px;
    background: white;
    border: 4px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .word-button:first-child:nth-last-child(2),
  .word-button:first-child:nth-last-child(2) ~ .word-button {
    grid-column: span 1;
  }

  .word-button:first-child:nth-last-child(2) {
    grid-column-start: 1;
  }

  .word-button:first-child:nth-last-child(2) ~ .word-button:last-child {
    grid-column-start: 3;
  }

  .word-button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .word-button.highlighted {
    border-color: #FFD700;
    background: #FFF9C4;
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  }

  .word-button img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }

  .word-text {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }

  .celebration {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
  }

  .celebration-content {
    text-align: center;
    padding: 60px;
    background: white;
    border-radius: 20px;
    animation: bounce 0.5s;
  }

  .applause {
    font-size: 80px;
    margin-bottom: 20px;
    animation: shake 0.5s infinite;
  }

  .celebration-content h2 {
    font-size: 48px;
    color: #4CAF50;
    margin: 0 0 20px 0;
  }

  .celebration-content p {
    font-size: 32px;
    color: #666;
    margin: 0;
  }

  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes shake {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }

  @media (max-width: 768px) {
    .video-container iframe {
      height: 250px;
    }

    .words-grid {
      gap: 15px;
      padding: 15px;
    }

    .word-button {
      min-width: 120px;
      padding: 15px;
    }

    .word-button img {
      width: 80px;
      height: 80px;
    }

    .word-text {
      font-size: 18px;
    }
  }
</style>
