import express from 'express';
import {uploadAudio} from '../middlewares/upload.js';
import { convertAudio } from '../controllers/audioController.js';
import { downloadFile } from '../utils/downloadFile.js';

export const AudioConvertRouter = express.Router();

AudioConvertRouter.post('/convert', uploadAudio.single('audio'), convertAudio);
AudioConvertRouter.get('/download/:fileId', downloadFile);