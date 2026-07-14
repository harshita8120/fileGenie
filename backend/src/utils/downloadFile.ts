import { Request, Response } from 'express';
import fs from 'fs';
import { ConvertedFile } from '../models/convertedFile.js';
import { buildDownloadFileName } from './fileNaming.js';

export const downloadFile = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;

    const doc = await ConvertedFile.findById(fileId);

    if (!doc) {
      return res.status(404).json({ error: 'File not found or link invalid' });
    }

    if (doc.expiresAt < new Date()) {
      return res.status(410).json({ error: 'This download link has expired' });
    }

    if (!fs.existsSync(doc.storagePath)) {
      return res.status(404).json({ error: 'File no longer available' });
    }

    if (!doc.originalName) {
      return res.status(500).json({ error: 'Missing file metadata' });
    }

    const downloadFileName = buildDownloadFileName(doc.originalName, doc.outputFormat);

    res.set('Content-Type', `${doc.fileType}/${doc.outputFormat}`);
    res.set('Content-Disposition', `attachment; filename=${downloadFileName}`);

    const readStream = fs.createReadStream(doc.storagePath);
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Download failed' });
  }
};