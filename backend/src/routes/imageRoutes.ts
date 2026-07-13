import express from 'express';
import {uploadImage} from '../middlewares/upload.js';
import { convertImage, downloadImage } from '../controllers/imageController.js';

export const ImageConvertRouter = express.Router();


ImageConvertRouter.post('/convert', uploadImage.single('image'), convertImage);
ImageConvertRouter.get('/download/:fileId', downloadImage);