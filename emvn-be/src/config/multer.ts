import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';

export type DestinationCallback = (error: Error | null, destination: string) => void;
export type FileNameCallback = (error: Error | null, filename: string) => void;

export const fileStorage = multer.diskStorage({
  destination: (request: Request, file: Express.Multer.File, callback: DestinationCallback): void => {
    // ...Do your stuff here.
    callback(null, path.join(__dirname, '../upload/'));
  },

  filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
    callback(null, randomUUID() + '.' + file.originalname);
  },
});

const acceptedFiles = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'audio/mpeg3',
  'audio/mpeg',
  'audio/x-mpeg-3',
  'video/mpeg',
  'video/x-mpeg',
];

export const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  if (acceptedFiles.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export const upload = multer({
  storage: fileStorage,
  // fileFilter,
});
