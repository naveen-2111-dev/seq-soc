import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Post } from './post.js';
import { User } from './user.js';

interface CommentAttributes {
  id?: number;
  postId: number;
  userId?: number;
  content: string;
}

export class Comment
  extends Model<CommentAttributes>
  implements CommentAttributes
{
  public id!: number;
  public postId!: number;
  public userId?: number;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    postId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    indexes: [
      { name: 'idx_postId', fields: ['postId'] },
      { name: 'idx_userId', fields: ['userId'] },
    ],
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true,
  },
);

Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });

Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
