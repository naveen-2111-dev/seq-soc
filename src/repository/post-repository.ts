import { sequelize } from '../config/database.js';
import { Comment } from '../models/comments.js';
import { Post } from '../models/post.js';
import { User } from '../models/user.js';
import { Op } from 'sequelize';

export function postRepository() {
  const createPost = async (
    content: string,
    imageUrl: string,
    userId: number,
  ) => {
    const data = await Post.create({
      content,
      imageUrl,
      userId,
      visibility: true,
      downVotes: 0,
      upVotes: 0,
    });

    return {
      status: 200,
      message: 'post created successfully',
      data,
    };
  };

  const updatePost = async (postId: number, content: string) => {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error('Post not found');

    post.content = content;
    await post.save();

    const updatedPost = await Post.findByPk(postId);

    return {
      status: 200,
      message: 'updated post successfully',
      data: updatedPost,
    };
  };

  const changeVisibility = async (postId: number, visibility: boolean) => {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error('Post not found');

    post.visibility = visibility;
    await post.save();

    return {
      status: 200,
      message: 'visibility changed successfully',
      data: post,
    };
  };

  const comment = async (postId: number, content: string, userId: number) => {
    const data = await Comment.create({
      postId,
      userId,
      content,
    });

    return {
      status: 200,
      message: 'comment added successfully',
      data,
    };
  };

  const upVote = async (postId: number, status: 'cr' | 'rm') => {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error('Post not found');

    await post.increment({ upVotes: status === 'cr' ? 1 : -1 });

    await post.reload();

    return {
      status: 200,
      message: 'vote updated',
      data: post,
    };
  };

  const downVote = async (postId: number, status: 'cr' | 'rm') => {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error('Post not found');

    await post.increment({ downVotes: status === 'cr' ? 1 : -1 });

    await post.reload();

    return {
      status: 200,
      message: 'vote updated',
      data: post,
    };
  };

  const getComment = async (commentId: number) => {
    const data = await Comment.findByPk(commentId);

    return {
      status: 200,
      message: 'fetch successful',
      data,
    };
  };

  const getCommentByPost = async (postId: number) => {
    const data = await Comment.findAll({
      where: {
        postId: postId,
      },
    });

    return {
      status: 200,
      message: 'fetch successfull',
      data,
    };
  };

  const getAllPost = async () => {
    const data = await Post.findAll({
      where: {
        visibility: true,
      },
    });

    return {
      status: 200,
      message: 'posts fetched successfully',
      data,
    };
  };

  const getPost = async (postId: number) => {
    const data = await Post.findByPk(postId);

    return {
      status: 200,
      message: 'post fetched successfully',
      data,
    };
  };

  const getbyVisibility = async (visibility: boolean) => {
    const data = await Post.findAll({
      where: { visibility },
    });

    return {
      status: 200,
      message: 'posts fetched successfully',
      data,
    };
  };

  const getTrendingPost = async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const data = await Post.findAll({
      where: {
        visibility: true,
        createdAt: { [Op.gte]: yesterday },
      },
      order: [['upVotes', 'DESC']],
      limit: 20,
      include: [{ model: User, as: 'author' }],
    });

    return {
      status: 200,
      message: 'trending posts fetched successfully',
      data,
    };
  };

  const getPostWithComment = async () => {
    const [rows] = await sequelize.query(`
  SELECT *
  FROM posts AS p
  INNER JOIN comments AS c
  ON p.id = c.postId;
`);
    return {
      status: 200,
      message: 'post with content fetch successfull',
      data: rows,
    };
  };

  return {
    createPost,
    updatePost,
    changeVisibility,
    comment,
    getComment,
    getAllPost,
    getPost,
    getbyVisibility,
    getTrendingPost,
    upVote,
    downVote,
    getCommentByPost,
    getPostWithComment,
  };
}
