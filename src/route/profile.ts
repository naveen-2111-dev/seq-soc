import express, { Router } from 'express';
import { ProfileService } from '../service/profile-service.js';

const router: Router = express.Router();
const { updateprofile, getprofile } = ProfileService();

router.put('/', async (req, res) => {
	const { email, profileImageUrl } = req.body;

	if (!email || !profileImageUrl) {
		return res.status(400).json({
			status: 400,
			message: 'Email and profile image URL are required',
		});
	}

	const result = await updateprofile(email, profileImageUrl);
	return res.status(result.status ?? 200).json(result);
});

router.get('/', async (req, res) => {
	const email = String(req.query.email ?? '');

	if (!email) {
		return res.status(400).json({
			status: 400,
			message: 'Email is required',
		});
	}

	const result = await getprofile(email);
	return res.status(result.status ?? 200).json(result);
});

export default router;
