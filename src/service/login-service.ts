import { AuthRepository } from "../repository/auth-repository.js";
import bcrypt from "bcrypt";

export async function loginService(email: string, password: string) {
  const authRepo = AuthRepository();

  const res = await authRepo.login(email);

  if (!res.user) {
    return {
      status: 404,
      message: "User not found",
    };
  }

  const isMatch = await bcrypt.compare(
    password,
    res.user.passwordHash
  );

  if (!isMatch) {
    return {
      status: 401,
      message: "Invalid credentials",
    };
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...safeUser } = res.user.toJSON
    ? res.user.toJSON()
    : res.user;

  return {
    status: 200,
    message: "Login successful",
    user: safeUser,
  };
}
