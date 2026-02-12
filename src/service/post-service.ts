import { postRepository } from '../repository/post-repository.js';

export function postService() {
  const {
    createPost,
    updatePost,
    changeVisibility,
    downVote,
    getAllPost,
    getPost,
    getTrendingPost,
    getbyVisibility,
    upVote,
  } = postRepository();

  const PostCreate = async (
    content: string,
    imageUrl: string,
    userId: number,
  ) => {
    return await createPost(content, imageUrl, userId);
  };

  const PostUpdate = async (postId: number, content: string) => {
    return await updatePost(postId, content);
  };

  const ChangeVisibility = async (postId: number, visibility: boolean) => {
    return await changeVisibility(postId, visibility);
  };

  const UpVote = async (postId: number, status: 'cr' | 'rm') => {
    return await upVote(postId, status);
  };

  const DownVote = async (postId: number, status: 'cr' | 'rm') => {
    return await downVote(postId, status);
  };

  const GetAllPost = async () => {
    return await getAllPost();
  };

  const GetPost = async (postId: number) => {
    return await getPost(postId);
  };

  const GetByVisibility = async (visibility: boolean) => {
    return await getbyVisibility(visibility);
  };

  const GetTrendingPost = async () => {
    return await getTrendingPost();
  };

  return {
    PostCreate,
    PostUpdate,
    ChangeVisibility,
    UpVote,
    DownVote,
    GetAllPost,
    GetPost,
    GetByVisibility,
    GetTrendingPost,
  };
}
