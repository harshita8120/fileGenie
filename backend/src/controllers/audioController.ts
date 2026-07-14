import { Request, Response } from 'express';
import { fileTypeFromBuffer } from 'file-type';
import fsPromises from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { AudioConverter } from '../services/audios/audioConverter.js';
import { ConvertedFile } from '../models/convertedFile.js';
import {SUPPORTED_AUDIO_INPUT_FORMATS} from '../types/audio.types.js';
import { buildDownloadFileName } from '../utils/fileNaming.js';

const TEMP_DIR = path.resolve('temp');
const EXPIRY_MINUTES = 10;

export const convertAudio = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
    
        const { targetFormat, bitrate, sampleRate } = req.body;
    
        // validation logic
        const detected = await fileTypeFromBuffer(file.buffer);
    
        if (!detected || !detected.mime.startsWith('audio/')) {
          return res.status(400).json({ error: 'Invalid audio file' });
        }
    
        if (!SUPPORTED_AUDIO_INPUT_FORMATS.includes(detected.ext)) {
          return res.status(400).json({
            error: `Input format .${detected.ext} is not supported for conversion`,
          });
        }

        const converter = new AudioConverter(file.buffer, detected.ext);
        const outputBuffer = await converter.convert(targetFormat, {
            bitrate: bitrate ? parseInt(bitrate) : undefined,
            sampleRate: sampleRate ? parseInt(sampleRate) : undefined,
        });
    
        // write converted file to temp/ instead of sending directly
        const filename = `${randomUUID()}.${targetFormat}`;
        const storagePath = path.join(TEMP_DIR, filename);
        await fsPromises.writeFile(storagePath, outputBuffer);
        
        // save metadata + expiry in MongoDB
        const expiresAt = new Date(Date.now() + EXPIRY_MINUTES * 60 * 1000);
        const doc = await ConvertedFile.create({
            originalName: file.originalname,
            fileType: 'audio',
            inputFormat: detected.ext,
            outputFormat: targetFormat,
            storagePath,
            size: outputBuffer.length,
            expiresAt,
        });
        
        // respond with a download link
        const downloadFileName = buildDownloadFileName(file.originalname, targetFormat);
    
        res.status(201).json({
            fileId: doc._id,
            downloadUrl: `/api/audios/download/${doc._id}`,
            downloadFileName,
            expiresAt,
        });
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: err instanceof Error ? err.message : 'Conversion failed' });
        }
}
