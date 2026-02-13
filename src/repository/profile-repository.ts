import { User } from '../models/user.js';

export function ProfileRepository() {
  const updateProfile = async (email: string, profileImageUrl: string) => {
    const data = await User.update(
      {
        profileImage: profileImageUrl,
      },
      {
        where: {
          email: email,
        },
      },
    );

    return {
      status: 200,
      message: 'Profile updated successfully',
      data,
    };
  };

  const getProfile = async (email: string) => {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    return {
      status: 200,
      message: 'Profile retrieved successfully',
      data: user,
    };
  }

  return {
    updateProfile,
    getProfile,
  }
}
