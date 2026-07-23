import express from 'express';
import {uploadDocument} from '../middlewares/upload.js';
import { convertDocument } from '../controllers/documentController.js';
import { downloadFile } from '../utils/downloadFile.js';

export const DocumentConvertRouter = express.Router();

DocumentConvertRouter.post('/convert', uploadDocument.single('document'), convertDocument);
DocumentConvertRouter.get('/download/:fileId', downloadFile);