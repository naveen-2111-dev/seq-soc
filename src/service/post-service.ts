import { postRepository } from '../repository/post-repository.js';

export function postService() {
  const {
    createPost,
    updatePost,
    changeVisibility,
    getAllPost,
    getPost,
    getTrendingPost,
    getbyVisibility,
    getUserPosts
  } = postRepository();

  const PostCreate = async (
    content: string,
    imageUrl: string,
    userId: number,
  ) => {
    return await createPost(content, imageUrl, userId);
  };

  const PostUpdate = async (postId: number, content: string, imageUrl: string) => {
    return await updatePost(postId, content, imageUrl);
  };

  const ChangeVisibility = async (postId: number, visibility: boolean) => {
    return await changeVisibility(postId, visibility);
  };

  const GetAllPost = async () => {
    return await getAllPost();
  };

  const GetPost = async (postId: number) => {
    return await getPost(postId);
  };

  const GetUserPosts = async (userId: number) => {
    return await getUserPosts(userId);
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
    GetAllPost,
    GetPost,
    GetByVisibility,
    GetTrendingPost,
    getUserPosts,
    GetUserPosts
  };
}
