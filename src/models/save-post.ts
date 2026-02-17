import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Post } from './post.js';
import { User } from './user.js';

interface SavePostAttributes {
  id?: number;
  userId: number;
  postId: number;
}

class SavePost extends Model<SavePostAttributes> implements SavePostAttributes {
  declare id?: number;
  declare userId: number;
  declare postId: number;
}

SavePost.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'SavePost',
    tableName: 'SavedPosts',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'postId'],
        name: 'unique_user_post',
      }
    ]
  },
);

SavePost.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'Post',
});

SavePost.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
});

User.hasMany(SavePost, {
  foreignKey: 'userId',
  as: 'SavedPosts',
});

Post.hasMany(SavePost, {
  foreignKey: 'postId',
  as: 'SavedByUsers',
});

export { SavePost };
