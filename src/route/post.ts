import express, { Router } from 'express';
import { postService } from '../service/post-service.js';
import { getUserIdFromRequest } from '../helper/get-user-id.js';

const router:Router = express.Router();
const {
  PostCreate,
  PostUpdate,
  ChangeVisibility,
  GetAllPost,
  GetPost,
  GetByVisibility,
  GetTrendingPost,
  getUserPosts
} = postService();

router.post('/create', async (req, res) => {
  const { content, imageUrl } = req.body;
  const userId = getUserIdFromRequest(req);
  const result = await PostCreate(content, imageUrl, Number(userId));
  res.json(result);
});

router.put('/update/:postId', async (req, res) => {
  const { postId } = req.params;
  const { content, imageUrl } = req.body;
  const result = await PostUpdate(Number(postId), content, imageUrl);
  res.json(result);
});

router.patch('/visibility/:postId', async (req, res) => {
  const { postId } = req.params;
  const { visibility } = req.body;
  const result = await ChangeVisibility(Number(postId), visibility);
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

router.get('/', async (req, res) => {
  const userId = getUserIdFromRequest(req);
  const result = await getUserPosts(Number(userId));
  res.json(result);
});

export default router;
