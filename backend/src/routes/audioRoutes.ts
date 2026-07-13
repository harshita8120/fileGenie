import express from 'express';
import {uploadAudio} from '../middlewares/upload.js';
import { convertAudio, downloadAudio } from '../controllers/audioController.js';

export const AudioConvertRouter = express.Router();

AudioConvertRouter.post('/convert', uploadAudio.single('audio'), convertAudio);
AudioConvertRouter.get('/download/:fileId', downloadAudio);