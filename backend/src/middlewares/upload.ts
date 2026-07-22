import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const storage = multer.memoryStorage();

const ImageFileFilter = (
  _req: Request,//deliberately ununsed
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);//null=no error; true=accept this file
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const AudioFileFilter = (
  _req: Request,//deliberately ununsed
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith('audio/')) {
    cb(null, true);//null=no error; true=accept this file
  } else {
    cb(new Error('Only audio files are allowed'));
  }
};

const ALLOWED_DOCUMENT_MIME_TYPES = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
  'application/pdf', // .pdf
  'text/plain', // .txt
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
];

const DocumentFileFilter = (
  _req: Request,//deliberately ununsed
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (ALLOWED_DOCUMENT_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);//null=no error; true=accept this file
  } else {
    cb(new Error('Only document files (DOCX, PPTX, PDF) are allowed'));
  }
};


export const uploadImage = multer({
  storage,
  fileFilter: ImageFileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
  },
});

export const uploadAudio = multer({
  storage,
  fileFilter: AudioFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

export const uploadDocument = multer({
  storage,
  fileFilter: DocumentFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});
