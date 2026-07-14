import mongoose from 'mongoose';

const convertedFileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  fileType: { type: String, required: true, enum: ['image', 'audio', 'document']},
  inputFormat: { type: String, required: true },
  outputFormat: { type: String, required: true },
  storagePath: { type: String, required: true },
  size: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

export const ConvertedFile = mongoose.model('ConvertedFile', convertedFileSchema);