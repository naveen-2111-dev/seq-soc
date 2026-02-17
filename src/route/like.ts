import express, { Router, type Request, type Response } from 'express';
import type { AuthenticatedRequest } from '../middleare.js';
import { getUserIdFromRequest } from '../helper/get-user-id.js';
import { likeService } from '../service/like-service.js';

const router: Router = express.Router();
const { likePost, unlikePost } = await likeService();

router.post('/like', async (req: AuthenticatedRequest, res: Response) => {
  const { postId } = req.body;
  const userId = getUserIdFromRequest(req);

  if (!userId || !postId) {
    return res.status(400).json({ message: 'User ID and Post ID are required' });
  }

  const result = await likePost(userId, postId);
  return res.json(result);
});

router.delete('/unlike', async (req: AuthenticatedRequest, res: Response) => {
  const { postId } = req.body;
  const userId = getUserIdFromRequest(req);

  if (!userId || !postId) {
    return res.status(400).json({ message: 'User ID and Post ID are required' });
  }

  const result = await unlikePost(userId, postId);
  return res.json(result);
});

export default router;
