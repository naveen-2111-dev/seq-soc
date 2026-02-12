import { User } from '../models/user.js';

export function AuthRepository() {
  const register = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ) => {
    const user = await User.create({
      firstName: firstname,
      lastName: lastname,
      email: email,
      passwordHash: password,
    });

    return {
      user,
      message: 'User registered successfully',
      status: 200,
    };
  };

  const login = async (email: string) => {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    user?.fullName

    return {
      user,
      message: 'user login successfully',
      status: 200,
    };
  };

  return {
    register,
    login,
  };
}
