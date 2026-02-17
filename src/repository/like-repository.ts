import { Like } from '../models/like.js';

export async function likeRepository() {
  const like = async (userId: number, postId: number) => {
    const data = await Like.create({
      userId,
      postId,
    });

    return {
      data,
      message: 'User liked successfully',
      status: 200,
    };
  };

  const unlike = async (userId: number, postId: number) => {
    const data = await Like.destroy({
      where: {
        userId,
        postId,
      },
    });

    return {  
      data,
      message: 'User unliked successfully',
      status: 200,
    };
  };

  return {
    like,
    unlike
  }
}
