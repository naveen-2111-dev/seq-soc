import { Post, SavePost, User } from '../models/index.js';

export function SaveRepository() {
  const savePost = async (userId: number, postId: number) => {
    const data = await SavePost.create(
      {
        userId,
        postId
      }
    );

    return {
      status: 200,
      message: 'Post saved successfully',
      data,
    };
  };

  const unsavePost = async (userId: number, postId: number) => {
    const result = await SavePost.destroy({
      where: {
        userId,
        postId,
      },
    });

    if (result === 0) {
      return {
        status: 404,
        message: 'Saved post not found',
      };
    }

    return {
      status: 200,
      message: 'Post unsaved successfully',
    };
  }

  const getSavedPosts = async (userId: number) => {
    const savedPosts = await SavePost.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
    });

    return {
      status: 200,
      message: 'Saved posts retrieved successfully',
      data: savedPosts,
    };
  }

  return {
    savePost,
    getSavedPosts,
    unsavePost,
  };
}
