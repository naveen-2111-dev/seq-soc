import { User } from './user.js';
import { Post } from './post.js';
import { Comment } from './comments.js';
import { sequelize } from '../config/database.js';
import { Follow } from './follow.js';
import { SavePost } from './save-post.js';
import { Like } from './like.js';

export { sequelize, User, Post, Comment, Follow, SavePost, Like };
