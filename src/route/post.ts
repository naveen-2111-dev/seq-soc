import express, { Router } from 'express';
import { postService } from '../service/post-service.js';

const router:Router = express.Router();
const {
  PostCreate,
  PostUpdate,
  ChangeVisibility,
  UpVote,
  DownVote,
  GetAllPost,
  GetPost,
  GetByVisibility,
  GetTrendingPost,
} = postService();

router.post('/create', async (req, res) => {
  const { content, imageUrl, userId } = req.body;
  const result = await PostCreate(content, imageUrl, userId);
  res.json(result);
});

router.put('/update/:postId', async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const result = await PostUpdate(Number(postId), content);
  res.json(result);
});

router.patch('/visibility/:postId', async (req, res) => {
  const { postId } = req.params;
  const { visibility } = req.body;
  const result = await ChangeVisibility(Number(postId), visibility);
  res.json(result);
}); 

router.patch('/upvote/:postId', async (req, res) => {
  const { postId } = req.params;
  const { status } = req.body;
  const result = await UpVote(Number(postId), status);
  res.json(result);
});

router.patch('/downvote/:postId', async (req, res) => {
  const { postId } = req.params;
  const { status } = req.body;
  const result = await DownVote(Number(postId), status);
  res.json(result);
});

router.get('/all', async (_req, res) => {
  const result = await GetAllPost();
  return res.json(result);
});

router.get('/trending', async (_req, res) => {
  const result = await GetTrendingPost();
  res.json(result);
});

router.get('/visibility/:visibility', async (req, res) => {
  const { visibility } = req.params;
  const result = await GetByVisibility(visibility === 'true');
  res.json(result);
});

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const result = await GetPost(Number(postId));
  res.json(result);
});

export default router;
