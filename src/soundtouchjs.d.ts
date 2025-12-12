declare module 'soundtouchjs' {
  export class SoundTouch {
    tempo: number;
    pitch: number;
    rate: number;
    pitchSemitones: number;
  }

  export class PitchShifter {
    constructor(context: AudioContext, buffer: AudioBuffer, bufferSize: number);
    tempo: number;
    pitch: number;
    pitchSemitones: number;
    rate: number;
    percentagePlayed: number;
    connect(node: AudioNode): void;
    disconnect(): void;
    on(eventName: string, callback: (detail: any) => void): void;
    off(eventName?: string): void;
  }

  export class SimpleFilter {
    constructor(
      sourceSound: Float32Array,
      sourceSound2: Float32Array,
      pipe: SoundTouch
    );
    extract(target: Float32Array, numFrames: number): Float32Array[];
  }
}
