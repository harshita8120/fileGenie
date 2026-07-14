import express from 'express';
import {uploadImage} from '../middlewares/upload.js';
import { convertImage } from '../controllers/imageController.js';
import { downloadFile } from '../utils/downloadFile.js';

export const ImageConvertRouter = express.Router();


ImageConvertRouter.post('/convert', uploadImage.single('image'), convertImage);
ImageConvertRouter.get('/download/:fileId', downloadFile);