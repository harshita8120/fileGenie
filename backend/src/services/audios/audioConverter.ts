import ffmpegPath from 'ffmpeg-static';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { AudioFormat, AudioConversionOptions } from '../../types/audio.types.js';
import { deleteTempFiles } from '../../utils/instantCleanup.js';

const TEMP_DIR = path.resolve('temp');
const SCRATCH_DIR = path.join(TEMP_DIR, 'scratch');

const FFMPEG_BINARY = ffmpegPath as unknown as string; //explicitly telling TS it's a string

// maps our clean target format names → ffmpeg's actual muxer names (from -muxers output)
const MUXER_MAP: Record<AudioFormat, string> = {
  mp3: 'mp3',
  wav: 'wav',
  flac: 'flac',
  aac: 'adts',   //no 'aac' muxer exists, must use 'adts'
  ogg: 'ogg',
  m4a: 'ipod',   //no 'm4a' muxer exists, must use 'ipod'
  opus: 'opus',
};

export class AudioConverter {
  private buffer: Buffer;
  private originalFormat: string;

  constructor(buffer: Buffer, originalFormat: string) {
    this.buffer = buffer;
    this.originalFormat = originalFormat;
  }

  async convert(targetFormat: AudioFormat, options: AudioConversionOptions = {}): Promise<Buffer> {
    // Write the uploaded buffer to a temporary input file
    const inputFileName = `input-${randomUUID()}.${this.originalFormat}`;
    const inputPath = path.join(SCRATCH_DIR, inputFileName);
    await fs.writeFile(inputPath, this.buffer);

    //Decide the output file's path
    const outputFileName = `output-${randomUUID()}.${targetFormat}`;
    const outputPath = path.join(SCRATCH_DIR, outputFileName);

    //Look up the real muxer name ffmpeg needs (from our MUXER_MAP)
    const muxer = MUXER_MAP[targetFormat];

    const args: string[] = [
      '-y',          // overwrite output file if it already exists (shouldn't happen with UUIDs, but safe default)
      '-i', inputPath, // input file to read
    ];

    if (options.sampleRate) {
      args.push('-ar', options.sampleRate.toString());
    }

    //Handle bitrate — only applies to lossy/compressed formats
    const LOSSY_FORMATS: AudioFormat[] = ['mp3', 'aac', 'm4a', 'ogg', 'opus'];

    if (LOSSY_FORMATS.includes(targetFormat)) {
      const bitrate = this._resolveBitrate(targetFormat, options.bitrate);
      args.push('-b:a', `${bitrate}k`);
    }

    args.push('-f', muxer);    // the actual muxer/container to write
    args.push(outputPath); 

    //CLI version: ffmpeg -y -i input.mp3 -ar 44100 -f adts output.aac

    //Run ffmpeg as a child process
    if (!FFMPEG_BINARY) {
      throw new Error('FFmpeg binary path could not be resolved.');
    }

    await new Promise<void>((resolve, reject) => {
      const child = spawn(FFMPEG_BINARY, args);

      let stderrOutput = '';
      child.stderr.on('data', (chunk: Buffer) => {
        stderrOutput += chunk.toString();
      });

      child.on('error', (err) => {
        reject(new Error(`Failed to start ffmpeg: ${err.message}`));
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`FFmpeg exited with code ${code}: ${stderrOutput}`));
        }
      });
    });

    const outputBuffer = await fs.readFile(outputPath);

    await deleteTempFiles([inputPath, outputPath]);
    return outputBuffer;
  }

  private _resolveBitrate(format: AudioFormat, requested?: number): number {
    if (requested) return requested;
    const defaults: Partial<Record<AudioFormat, number>> = {
      mp3: 192,
      aac: 128,
      m4a: 128,
      ogg: 128,
      opus: 96,
    };
    return defaults[format] ?? 128;
  }
}