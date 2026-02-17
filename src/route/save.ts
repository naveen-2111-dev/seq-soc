import express, { Router } from 'express';
import { saveService } from '../service/save-service.js';
import { getUserIdFromRequest } from '../helper/get-user-id.js';

const router: Router = express.Router();
const { savepost, unsavepost, getSavedPostsByUser } = saveService();

router.post('/save', async (req, res) => {
	const { postId } = req.body;
	const userId = getUserIdFromRequest(req);
	if (!userId) {
		return res.status(400).json({ message: 'User ID is required' });
	}
	const result = await savepost(Number(userId), Number(postId));
	res.status(result.status ?? 200).json(result);
});

router.delete('/unsave', async (req, res) => {
	const { postId } = req.body;
	const userId = getUserIdFromRequest(req);
	if (!userId) {
		return res.status(400).json({ message: 'User ID is required' });
	}
	const result = await unsavepost(Number(userId), Number(postId));
	res.status(result.status ?? 200).json(result);
});

router.get('/user', async (req, res) => {
	try {
		const userId = getUserIdFromRequest(req);
		if (!userId) {
			return res.status(400).json({ message: 'User ID is required' });
		}
		const result = await getSavedPostsByUser(Number(userId));
		res.status(result.status ?? 200).json(result);
	} catch (error) {
		console.error("FULL ERROR:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

export default router;
