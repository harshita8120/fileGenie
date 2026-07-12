import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ImageConvertRouter } from './routes/imageRoutes.js';
import './jobs/cleanUp.js'; // starts the cron job as a side effect of importing it

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4500;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/filegenie';

app.use(cors());
app.use(express.json());

app.use('/api/images', ImageConvertRouter);

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