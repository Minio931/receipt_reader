import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import * as path from "path";

const storageDir = path.resolve(process.cwd(), "storage");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowed = /jpeg|jpg|png|gif/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Tylko pliki graficzne są akceptowane! 😢"));
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // max 5 MB
};

const upload = multer({ storage, fileFilter, limits });

export default upload;
