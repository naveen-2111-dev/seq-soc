import { sequelize } from '../config/database.js';
import { Comment } from '../models/comments.js';
import { Like } from '../models/like.js';
import { Post } from '../models/post.js';
import { User } from '../models/user.js';
import { col, fn, literal, Op } from 'sequelize';

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
    });

    return {
      status: 200,
      message: 'post created successfully',
      data,
    };
  };

  const updatePost = async (
    postId: number,
    content: string,
    imageUrl: string,
  ) => {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error('Post not found');

    if (content !== undefined) post.content = content;
    if (imageUrl !== undefined) post.imageUrl = imageUrl;

    try {
      await post.save();
    } catch (err: any) {
      console.error('Sequelize update error:', err.parent || err);
      throw new Error('Failed to update post');
    }

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
      include:[
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'profileImage'],
        }
      ]
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
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'profileImage'],
        },
        {
          model: Like,
          as: 'Likes',
          attributes: ['userId'],
        },
      ],
      order: sequelize.literal('RAND()'),
      limit: 50,
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

  const getUserPosts = async (userId: number) => {
    const data = await Post.findAll({
      where: {
        userId,
      },
    });

    return {
      status: 200,
      message: 'posts fetched successfully',
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
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'profileImage'],
        },
        {
          model: Like,
          as: 'Likes',
          attributes: [],
        },
      ],
      attributes: {
        include: [[fn('COUNT', col('Likes.userId')), 'likeCount']],
      },
      group: ['Post.id'],
      order: [[literal('likeCount'), 'DESC']],
      subQuery: false,
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
    getCommentByPost,
    getPostWithComment,
    getUserPosts,
  };
}
