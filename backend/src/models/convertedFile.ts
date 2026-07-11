import mongoose from 'mongoose';

const convertedFileSchema = new mongoose.Schema({
  originalName: String,
  fileType: String,
  inputFormat: String,
  outputFormat: String,
  storagePath: String,
  size: Number,
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

export const ConvertedFile = mongoose.model('ConvertedFile', convertedFileSchema);