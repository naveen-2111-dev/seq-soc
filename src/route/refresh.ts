import jwt from 'jsonwebtoken';
import express, { Router, type Request, type Response } from 'express';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token found' });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    ) as jwt.JwtPayload;

    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '15m' },
    );

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Access token refreshed successfully',
    });
    
  } catch (error) {
    return res.status(403).json({
      message: 'Invalid or expired refresh token',
    });
  }
});

export default router;
