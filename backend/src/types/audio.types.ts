export type AudioFormat =
  | 'mp3' | 'wav' | 'flac' | 'aac' | 'ogg' | 'm4a';

export const SUPPORTED_AUDIO_INPUT_FORMATS: string[] = [
  'mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma', 'opus',
];

export interface AudioConversionOptions {
  bitrate?: number;   //(kbps) — audio's equivalent of "quality"
  sampleRate?: number; //(Hz)
}

export interface AudioConversionRequestBody {
    targetFormat: AudioFormat;
    bitrate?: number;
    sampleRate?: number;
}