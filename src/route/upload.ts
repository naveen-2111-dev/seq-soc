import express, { Router } from 'express';
import multer from 'multer';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const router: Router = express.Router();

const uploadDir = join(process.cwd(), 'public', 'media');
await mkdir(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(err as Error, uploadDir);
    }
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  return res.json({
    success: true,
    url: `${process.env.BASE_URL}/media/${req.file.filename}`,
  });
});

export default router;
