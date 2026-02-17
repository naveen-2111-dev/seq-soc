import express, { Router } from 'express';
import type { AuthenticatedRequest } from '../middleare.js';
import { getUserIdFromRequest } from '../helper/get-user-id.js';
import { followService } from '../service/follow-service.js';

const router: Router = express.Router();
const {
	followUser,
	unfollowUser,
	getUserFollowers,
	getUserFollowing,
} = followService();

router.post('/follow', async (req: AuthenticatedRequest, res) => {
	const { followingId } = req.body;
	const followerId = getUserIdFromRequest(req);

	if (!followerId || !followingId) {
		return res.status(400).json({ message: 'Follower and following IDs are required' });
	}

	const result = await followUser(followerId, Number(followingId));
	return res.json(result);
});

router.delete('/unfollow', async (req: AuthenticatedRequest, res) => {
	const { followingId } = req.body;
	const followerId = getUserIdFromRequest(req);

	if (!followerId || !followingId) {
		return res.status(400).json({ message: 'Follower and following IDs are required' });
	}

	const result = await unfollowUser(followerId, Number(followingId));
	return res.json(result);
});

router.get('/followers', async (req: AuthenticatedRequest, res) => {
	const userId = getUserIdFromRequest(req);

	if (!userId) {
		return res.status(400).json({ message: 'User ID is required' });
	}

	const result = await getUserFollowers(userId);
	return res.json(result);
});

router.get('/following', async (req: AuthenticatedRequest, res) => {
	const userId = getUserIdFromRequest(req);

	if (!userId) {
		return res.status(400).json({ message: 'User ID is required' });
	}

	const result = await getUserFollowing(userId);
	return res.json(result);
});

export default router;
