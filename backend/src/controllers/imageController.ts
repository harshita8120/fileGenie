import { Request, Response } from 'express';
import { fileTypeFromBuffer } from 'file-type'; //checks the actual file type irrespective of extension
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { ImageConverter } from '../services/images/imageConverter.js';
import { ConvertedFile } from '../models/convertedFile.js';
import {SUPPORTED_INPUT_FORMATS} from '../types/image.types.js';

const TEMP_DIR = path.resolve('temp');
const EXPIRY_MINUTES = 10;

export const convertImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { targetFormat, width, height, quality } = req.body;

    // validation logic
    const detected = await fileTypeFromBuffer(file.buffer);

    if (!detected || !detected.mime.startsWith('image/')) {
      return res.status(400).json({ error: 'Invalid image file' });
    }

    if (!SUPPORTED_INPUT_FORMATS.includes(detected.ext)) {
      return res.status(400).json({
        error: `Input format .${detected.ext} is not supported for conversion`,
      });
    }

    const converter = new ImageConverter(file.buffer, detected.ext);
    const outputBuffer = await converter.convert(targetFormat, {
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined,
      quality: quality ? parseInt(quality) : undefined,
    });

    // write converted file to temp/ instead of sending directly
    const filename = `${randomUUID()}.${targetFormat}`;
    const storagePath = path.join(TEMP_DIR, filename);
    await fs.writeFile(storagePath, outputBuffer);

    // save metadata + expiry in MongoDB
    const expiresAt = new Date(Date.now() + EXPIRY_MINUTES * 60 * 1000);
    const doc = await ConvertedFile.create({
      originalName: file.originalname,
      fileType: 'image',
      inputFormat: detected.ext,
      outputFormat: targetFormat,
      storagePath,
      size: outputBuffer.length,
      expiresAt,
    });

    // respond with a download link, not the raw file
    res.status(201).json({
      fileId: doc._id,
      downloadUrl: `/api/images/download/${doc._id}`,
      expiresAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err instanceof Error ? err.message : 'Conversion failed' });
  }
};