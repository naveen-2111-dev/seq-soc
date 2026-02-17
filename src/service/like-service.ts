import { likeRepository } from '../repository/like-repository.js';

export async function likeService() {
  const { like, unlike } = await likeRepository();

  const likePost = async (userId: number, postId: number) => {
    return await like(userId, postId);
  };

  const unlikePost = async (userId: number, postId: number) => {
    return await unlike(userId, postId);
  };

  return {
    likePost,
    unlikePost
  };
}
