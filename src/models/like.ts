import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './user.js';
import { Post } from './post.js';

interface LikeAttributes {
  id?: number;
  userId: number;
  postId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Like extends Model<LikeAttributes> implements LikeAttributes {
  declare id: number;
  declare userId: number;
  declare postId: number;
  declare readonly createdAt: Date;
}

Like.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'postId'],
      },
    ],
  },
);

Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Post, { foreignKey: 'postId' });
User.hasMany(Like, { foreignKey: 'userId' });
Post.hasMany(Like, { foreignKey: 'postId' });
