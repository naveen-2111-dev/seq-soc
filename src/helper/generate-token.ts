import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

export function generateToken(
  payload: object,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"]
) {
  const options: SignOptions = {};
  if (expiresIn !== undefined) {
    options.expiresIn = expiresIn;
  }
  return jwt.sign(payload, secret, options);
}
