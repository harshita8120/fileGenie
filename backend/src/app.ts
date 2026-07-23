import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
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