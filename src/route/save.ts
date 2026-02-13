import express, { Router } from 'express';
import { saveService } from '../service/save-service.js';

const router: Router = express.Router();
const { savepost, unsavepost, getSavedPostsByUser } = saveService();

router.post('/save', async (req, res) => {
	const { userId, postId } = req.body;
	const result = await savepost(Number(userId), Number(postId));
	res.status(result.status ?? 200).json(result);
});

router.delete('/unsave', async (req, res) => {
	const { userId, postId } = req.body;
	const result = await unsavepost(Number(userId), Number(postId));
	res.status(result.status ?? 200).json(result);
});

router.get('/user/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		const result = await getSavedPostsByUser(Number(userId));
		res.status(result.status ?? 200).json(result);
	} catch (error) {
		console.error("FULL ERROR:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

export default router;
