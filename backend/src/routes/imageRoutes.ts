import express from 'express';
import upload from '../middlewares/upload.js';
import { convertImage } from '../controllers/imageController.js';

export const ImageConvertRouter = express.Router();


ImageConvertRouter.post('/convert', upload.single('image'), convertImage);