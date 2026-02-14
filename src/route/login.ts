import express, { Router } from "express";
import { loginService } from "../service/login-service.js";

const router:Router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Email and password are required",
      });
    }

    const result = await loginService(email, password);
   
    res.cookie("refreshToken", result.user?.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(result.status).json(result);

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error,
    });
  }
});

export default router;
