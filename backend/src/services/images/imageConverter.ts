import sharp from 'sharp';
import { ImageFormat, ImageConversionOptions } from '../../types/image.types.js';

const SUPPORTED_FORMATS: ImageFormat[] = [
  'jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff', 'gif',
];

export class ImageConverter {
  private buffer: Buffer;
  private originalFormat: string;

  constructor(buffer: Buffer, originalFormat: string) {
    this.buffer = buffer;
    this.originalFormat = originalFormat;
  }

  private validateTargetFormat(targetFormat: ImageFormat): void {
    if (!SUPPORTED_FORMATS.includes(targetFormat)) {
      throw new Error(`Unsupported target format: ${targetFormat}`);
    }
  }

  async convert(targetFormat: ImageFormat, options: ImageConversionOptions = {}): Promise<Buffer> {
    this.validateTargetFormat(targetFormat);

    if (this.originalFormat === targetFormat && !options.width && !options.height) {
      return this.buffer;
    }

    let pipeline = sharp(this.buffer, { failOn: 'none' });//failOn prevents error for minor/recoverable corruption in the input file

    if (options.width || options.height) {
      pipeline = pipeline.resize(options.width, options.height, {
        fit: options.fit || 'inside',
        withoutEnlargement: true,
      });
    }

    const quality = this._resolveQuality(targetFormat, options.quality);

    switch (targetFormat) {
      case 'jpeg':
      case 'jpg':
        pipeline = pipeline.jpeg({ quality, mozjpeg: true });
        break;
      case 'png':
        pipeline = pipeline.png({ compressionLevel: options.compression ?? 6 });
        break;
      case 'webp':
        pipeline = pipeline.webp({ quality });
        break;
      case 'avif':
        pipeline = pipeline.avif({ quality });
        break;
      case 'tiff':
        pipeline = pipeline.tiff({ quality });
        break;
      case 'gif':
        pipeline = pipeline.gif();
        break;
    }

    return pipeline.toBuffer();
  }

  private _resolveQuality(format: ImageFormat, requested?: number): number {
    if (requested) return requested;
    const defaults: Partial<Record<ImageFormat, number>> = {
      jpeg: 80, jpg: 80, webp: 75, avif: 60, tiff: 80,
    };
    return defaults[format] ?? 80;
  }
}