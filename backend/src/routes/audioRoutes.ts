import express from 'express';
import upload from '../middlewares/upload.js';
import { convertAudio, downloadAudio } from '../controllers/audioController.js';

export const AudioConvertRouter = express.Router();

AudioConvertRouter.post('/convert', upload.single('audio'), convertAudio);
AudioConvertRouter.get('/download/:fileId', downloadAudio);