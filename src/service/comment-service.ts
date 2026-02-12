import { postRepository } from '../repository/post-repository.js';

export function commentService() {
  const {
    comment,
    getComment,
    getCommentByPost,
    getPostWithComment
  } = postRepository();

  const AddComment = async (
    postId: number,
    content: string,
    userId: number,
  ) => {
    return await comment(postId, content, userId);
  };

  const GetComment = async (commentId: number) => {
    return await getComment(commentId);
  };

  const GetCommentByPost = async (postId: number) => {
    return await getCommentByPost(postId);
  };

  const GetPostWithComment = async () => {
    return await getPostWithComment();
  }

  return {
    AddComment,
    GetComment,
    GetCommentByPost,
    GetPostWithComment
  };
}
