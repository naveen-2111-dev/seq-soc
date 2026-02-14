import jwt from "jsonwebtoken";
import express, { Router, type Request, type Response } from "express";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
      return res.status(401).json({ message: "No cookies found" });
    }

    const refreshToken = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("refreshToken="))
      ?.split("=")[1];

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as jwt.JwtPayload;

    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired refresh token",
    });
  }
});

export default router;
