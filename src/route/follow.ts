import express, { Router } from 'express';
import { followService } from '../service/follow-service.js';

const router: Router = express.Router();
const {
	followUser,
	unfollowUser,
	getUserFollowers,
	getUserFollowing,
} = followService();

router.post('/follow', async (req, res) => {
	const { followerId, followingId } = req.body;
	const result = await followUser(Number(followerId), Number(followingId));
	res.json(result);
});

router.delete('/unfollow', async (req, res) => {
	const { followerId, followingId } = req.body;
	const result = await unfollowUser(Number(followerId), Number(followingId));
	res.json(result);
});

router.get('/followers/:userId', async (req, res) => {
	const { userId } = req.params;
	const result = await getUserFollowers(Number(userId));
	res.json(result);
});

router.get('/following/:userId', async (req, res) => {
	const { userId } = req.params;
	const result = await getUserFollowing(Number(userId));
	res.json(result);
});

export default router;
