import { SoundTouch, SimpleFilter } from 'soundtouchjs';

export class AudioManager {
  private audioContext: AudioContext;
  private audioBuffer: AudioBuffer | null = null;
  private currentSource: AudioBufferSourceNode | null = null;

  constructor() {
    this.audioContext = new AudioContext();
  }

  async loadAudio(source: File | string): Promise<void> {
    let arrayBuffer: ArrayBuffer;

    if (source instanceof File) {
      arrayBuffer = await source.arrayBuffer();
    } else {
      const audioTag = new Audio(source as string)
      
      const response = await fetch(source, { mode: 'cors' });
      arrayBuffer = await response.arrayBuffer();
    }

    this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
  }

  async playSegment(startTime: number, endTime: number, playbackRate: number = 1.0): Promise<void> {
    if (!this.audioBuffer) {
      throw new Error('Audio not loaded');
    }

    this.stop();

    // If playback rate is 1.0, use simple playback without SoundTouch
    if (playbackRate === 1.0) {
      return this.playSimpleSegment(startTime, endTime);
    }

    // Use SoundTouch for pitch-preserving time-stretching
    return this.playStretchedSegment(startTime, endTime, playbackRate);
  }

  private async playSimpleSegment(startTime: number, endTime: number): Promise<void> {
    return new Promise((resolve) => {
      const source = this.audioContext.createBufferSource();
      source.buffer = this.audioBuffer;
      source.connect(this.audioContext.destination);

      const duration = endTime - startTime;

      source.onended = () => {
        this.currentSource = null;
        resolve();
      };

      this.currentSource = source;
      source.start(0, startTime, duration);
    });
  }

  private async playStretchedSegment(startTime: number, endTime: number, playbackRate: number): Promise<void> {
    const audioBuffer = this.audioBuffer;
    if (!audioBuffer) {
      throw new Error('Audio not loaded');
    }

    return new Promise((resolve, reject) => {
      try {
        const sampleRate = audioBuffer.sampleRate;
        const channels = audioBuffer.numberOfChannels;

        // Extract the segment
        const startSample = Math.floor(startTime * sampleRate);
        const endSample = Math.floor(endTime * sampleRate);
        const segmentLength = endSample - startSample;

        console.log(`Processing audio: ${segmentLength} samples at ${playbackRate}x speed`);

        // Get audio data for the segment
        const leftChannel = audioBuffer.getChannelData(0).slice(startSample, endSample);
        const rightChannel = channels > 1
          ? audioBuffer.getChannelData(1).slice(startSample, endSample)
          : leftChannel;

        // Initialize SoundTouch - tempo should be inverted for slower playback
        const soundTouch = new SoundTouch();
        soundTouch.tempo = 1 / playbackRate; // Invert: 0.5x speed = tempo 2.0, 2x speed = tempo 0.5
        soundTouch.pitch = 1.0; // Keep original pitch
        soundTouch.rate = 1.0;

        console.log(`SoundTouch settings: tempo=${soundTouch.tempo}, pitch=${soundTouch.pitch}, rate=${soundTouch.rate}`);

        // Create filter with left and right channels
        const filter = new SimpleFilter(leftChannel, rightChannel, soundTouch);

        // Create output buffer to collect all processed samples
        const outputLeft: number[] = [];
        const outputRight: number[] = [];

        // Process all input samples
        let processed = filter.extract(new Float32Array(segmentLength * 2), segmentLength);
        if (processed && processed[0] && processed[0].length > 0) {
          outputLeft.push(...Array.from(processed[0] as Float32Array));
          if (processed[1]) {
            outputRight.push(...Array.from(processed[1] as Float32Array));
          } else {
            outputRight.push(...Array.from(processed[0] as Float32Array));
          }
        }

        // Flush any remaining samples
        processed = filter.extract(new Float32Array(0), 0);
        if (processed && processed[0] && processed[0].length > 0) {
          outputLeft.push(...Array.from(processed[0] as Float32Array));
          if (processed[1]) {
            outputRight.push(...Array.from(processed[1] as Float32Array));
          } else {
            outputRight.push(...Array.from(processed[0] as Float32Array));
          }
        }

        if (outputLeft.length === 0) {
          console.warn('SoundTouch returned no samples, using simple playback');
          return this.playSimpleSegment(startTime, endTime).then(resolve);
        }

        const outputLength = outputLeft.length;
        console.log(`Processed ${outputLength} samples from ${segmentLength} input samples (ratio: ${(outputLength / segmentLength).toFixed(2)})`);

        // Create new buffer for processed audio
        const processedBuffer = this.audioContext.createBuffer(
          channels,
          outputLength,
          sampleRate
        );

        // Fill the processed buffer
        processedBuffer.getChannelData(0).set(new Float32Array(outputLeft));
        if (channels > 1) {
          processedBuffer.getChannelData(1).set(new Float32Array(outputRight));
        }

        // Play the processed audio
        const bufferSource = this.audioContext.createBufferSource();
        bufferSource.buffer = processedBuffer;
        bufferSource.connect(this.audioContext.destination);

        bufferSource.onended = () => {
          this.currentSource = null;
          resolve();
        };

        this.currentSource = bufferSource;
        bufferSource.start(0);
      } catch (error) {
        console.error('SoundTouch processing failed:', error);
        // Fallback to simple playback
        this.playSimpleSegment(startTime, endTime).then(resolve).catch(reject);
      }
    });
  }

  stop(): void {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (e) {
        // Already stopped
      }
      this.currentSource = null;
    }
  }

  isLoaded(): boolean {
    return this.audioBuffer !== null;
  }
}

export async function prepareAudio(
  source: string,
  preload: boolean = true
): Promise<{ play: (options?: { startTime?: number; endTime?: number }) => Promise<void> }> {
  const templateAudio = new Audio();
  templateAudio.src = source;

  // Preload audio if requested
  if (preload) {
    templateAudio.preload = 'auto';
    await new Promise<void>((resolve, reject) => {
      const onCanPlayThrough = () => {
        templateAudio.removeEventListener('canplaythrough', onCanPlayThrough);
        templateAudio.removeEventListener('error', onError);
        resolve();
      };
      const onError = () => {
        templateAudio.removeEventListener('canplaythrough', onCanPlayThrough);
        templateAudio.removeEventListener('error', onError);
        reject(new Error('Failed to load audio'));
      };
      templateAudio.addEventListener('canplaythrough', onCanPlayThrough);
      templateAudio.addEventListener('error', onError);
      templateAudio.load();
    });
  }

  // Return object with play function
  return {
    play: async (options?: { startTime?: number; endTime?: number }) => {
      return new Promise<void>((resolve) => {
        // Create a new Audio instance for each play call to allow simultaneous playback
        const audio = new Audio();
        audio.src = source;

        // Set start time if specified
        if (options?.startTime !== undefined) {
          audio.currentTime = options.startTime;
        }

        // Handle end time if specified
        if (options?.endTime !== undefined) {
          const handleTimeUpdate = () => {
            if (audio.currentTime >= options.endTime!) {
              audio.pause();
            }
          };

          const cleanup = () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('pause', handlePause);
            resolve();
          };

          const handlePause = cleanup;
          const handleEnded = cleanup;

          audio.addEventListener('timeupdate', handleTimeUpdate);
          audio.addEventListener('pause', handlePause);
          audio.addEventListener('ended', handleEnded);
        } else {
          const handleEnded = () => resolve();
          audio.addEventListener('ended', handleEnded);
        }

        audio.play();
      });
    }
  };
}

export async function textToSpeech(text: string): Promise<void> {
  // Cancel any ongoing speech
  speechSynthesis.cancel();

  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9;
    utterance.onend = () => resolve();
    speechSynthesis.speak(utterance);
  });
}
