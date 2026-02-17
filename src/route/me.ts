import express from 'express';
import type { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

router.get('/me', async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return res.status(200).json({
      status: 200,
      message: 'User authenticated',
      user: decoded,
    });
  } catch {
    res.sendStatus(401);
  }
});

export default router;