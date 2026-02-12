import bcrypt from 'bcrypt';
import { AuthRepository } from '../repository/auth-repository.js';

export async function registerService(
  firstname: string,
  lastname: string,
  email: string,
  p: string,
) {
  const password: string = await bcrypt.hash(p, 10);
  const { register } = AuthRepository();

  const res = await register(firstname, lastname, email, password);

  return res;
}
