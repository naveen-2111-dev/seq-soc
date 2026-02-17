import express, { Router } from 'express';
import { ProfileService } from '../service/profile-service.js';
import type { AuthenticatedRequest } from '../middleare.js';
import { getEmailFromRequest } from '../helper/get-email.js';

const router: Router = express.Router();
const { updateprofile, getprofile } = ProfileService();

router.put('/', async (req: AuthenticatedRequest, res) => {
	const { profileImageUrl } = req.body;
	const email = getEmailFromRequest(req);

	if (!email || !profileImageUrl) {
		return res.status(400).json({
			status: 400,
			message: 'Profile image URL is required',
		});
	}

	const result = await updateprofile(email, profileImageUrl);
	return res.status(result.status ?? 200).json(result);
});

router.get('/', async (req: AuthenticatedRequest, res) => {
	const email = getEmailFromRequest(req);

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
