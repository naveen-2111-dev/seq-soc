import express, { Router } from "express";
import { registerService } from "../service/register-service.js";

const router:Router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
    }

    const result = await registerService(
      firstname,
      lastname,
      email,
      password
    );

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
