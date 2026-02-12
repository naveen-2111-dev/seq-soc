import express, { Router } from 'express';
import { commentService } from '../service/comment-service.js';

const router:Router = express.Router();
const {
  AddComment,
  GetComment,
  GetCommentByPost,
  GetPostWithComment
} = commentService();

router.post('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { content, userId } = req.body;
  const result = await AddComment(Number(postId), content, userId);
  res.json(result);
});

router.get("/getpostwithcomment", async (_, res) => {
  const result = await GetPostWithComment();
  res.json(result);
})

router.get('/post/:postId', async (req, res) => {
  const { postId } = req.params;
  const result = await GetCommentByPost(parseInt(postId));
  res.json(result);
});

router.get('/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const result = await GetComment(parseInt(commentId));
  res.json(result);
});

export default router;
