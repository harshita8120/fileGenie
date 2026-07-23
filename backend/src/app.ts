import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import rateLimit from 'express-rate-limit';
import { ImageConvertRouter } from './routes/imageRoutes.js';
import { AudioConvertRouter } from './routes/audioRoutes.js';
import { DocumentConvertRouter } from './routes/documentRoutes.js';
import './jobs/cleanUp.js'; // starts the cron job as a side effect of importing it

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4500;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/filegenie';

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());

//blocking malicious activity
const convertLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // max 10 conversion requests per IP per window
  message: { error: 'Too many conversion requests, please try again later.' },
});
app.use('/api/images/convert', convertLimiter);
app.use('/api/audios/convert', convertLimiter);
app.use('/api/documents/convert', convertLimiter);

app.use('/api/images', ImageConvertRouter);
app.use('/api/audios', AudioConvertRouter);
app.use('/api/documents', DocumentConvertRouter);

// ensure required folders exist before accepting any requests
const TEMP_DIR = path.resolve('temp');
const SCRATCH_DIR = path.join(TEMP_DIR, 'scratch', 'audio');

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}
if (!fs.existsSync(SCRATCH_DIR)) {
  fs.mkdirSync(SCRATCH_DIR, { recursive: true });
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });