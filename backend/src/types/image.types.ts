export type ImageFormat =
  | 'jpeg' | 'jpg' | 'png' | 'webp' | 'avif' | 'tiff' | 'gif';

export const SUPPORTED_INPUT_FORMATS: string[] = [
  'jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff', 'gif', 'bmp', 'heif', 'heic',
];

export interface ImageConversionOptions {
  width?: number;
  height?: number;
  quality?: number;
  compression?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export interface ConversionRequestBody {
  targetFormat: ImageFormat;
  width?: string;
  height?: string;
  quality?: string;
  compression?: string;
  fit?: ImageConversionOptions['fit'];
}