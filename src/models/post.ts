import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './user.js';

interface PostAttributes {
  id?: number;
  userId: number;
  content: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  upVotes: number;
  downVotes: number;
  visibility: boolean;
}

export class Post extends Model<PostAttributes> implements PostAttributes {
  declare id: number;
  declare userId: number;
  declare content: string;
  declare imageUrl?: string;
  declare visibility: boolean;
  declare upVotes: number;
  declare downVotes: number;

  declare readonly createdAt: Date;
  declare updatedAt: Date;
}

Post.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    indexes: [
      {
        name: 'idx_userId',
        fields: ['userId'],
      },
      {
        name: 'idx_visibility_createdAt',
        fields: ['visibility', 'createdAt'],
      },
      {
        name: 'idx_upVotes',
        fields: ['upVotes'],
      },
    ],
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true,
  },
);

Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
