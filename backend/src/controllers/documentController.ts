import { Request, Response } from 'express';
import { fileTypeFromBuffer } from 'file-type';
import fsPromises from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { DocumentConverter } from '../services/documents/documentConverter.js';
import { ConvertedFile } from '../models/convertedFile.js';
import {SUPPORTED_DOCUMENT_INPUT_FORMATS} from '../types/document.types.js';
import { buildDownloadFileName } from '../utils/fileNaming.js';

const TEMP_DIR = path.resolve('temp');
const EXPIRY_MINUTES = 10;

export const convertDocument = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
    
        const { targetFormat } = req.body;
    
        // validation logic
        const detected = await fileTypeFromBuffer(file.buffer);

// file-type can't detect plain text files (no binary signature exists for them) —
// fall back to the browser-declared mimetype specifically for this one case
        const isPlainText = !detected && file.mimetype === 'text/plain';

        if (!detected && !isPlainText) {
            return res.status(400).json({ error: 'Invalid document file' });
        }

        const isValidDocumentMime = isPlainText || detected?.mime.startsWith('application/') || detected?.mime === 'text/plain';

        if (!isValidDocumentMime) {
            return res.status(400).json({ error: 'Invalid document file' });
        }

        const detectedExt = isPlainText ? 'txt' : detected!.ext;

        if (!SUPPORTED_DOCUMENT_INPUT_FORMATS.includes(detectedExt)) {
            return res.status(400).json({
                error: `Input format .${detectedExt} is not supported for conversion`,
            });
        }
    

        const converter = new DocumentConverter(file.buffer, detectedExt);
        const outputBuffer = await converter.convert(targetFormat);
    
        // write converted file to temp/ instead of sending directly
        const filename = `${randomUUID()}.${targetFormat}`;
        const storagePath = path.join(TEMP_DIR, filename);
        await fsPromises.writeFile(storagePath, outputBuffer);
        
        // save metadata + expiry in MongoDB
        const expiresAt = new Date(Date.now() + EXPIRY_MINUTES * 60 * 1000);
        const doc = await ConvertedFile.create({
            originalName: file.originalname,
            fileType: 'document',
            inputFormat: detectedExt,
            outputFormat: targetFormat,
            storagePath,
            size: outputBuffer.length,
            expiresAt,
        });
        
        // respond with a download link
        const downloadFileName = buildDownloadFileName(file.originalname, targetFormat);
    
        res.status(201).json({
            fileId: doc._id,
            downloadUrl: `/api/documents/download/${doc._id}`,
            downloadFileName,
            expiresAt,
        });
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: err instanceof Error ? err.message : 'Conversion failed' });
        }

}
