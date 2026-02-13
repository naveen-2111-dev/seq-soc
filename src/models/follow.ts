import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.js";

interface FollowAttributes {
  id?: number;
  followerId: number;
  followingId: number;
}

class Follow extends Model<FollowAttributes> implements FollowAttributes {
  declare id?: number;
  declare followerId: number;
  declare followingId: number;
}

Follow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "Follows",
    timestamps: true,
    sequelize,
    indexes: [
      {
        unique: true,
        fields: ["followerId", "followingId"],
      },
    ],
  }
);

User.hasMany(Follow, { foreignKey: "followerId", as: "Following" });
User.hasMany(Follow, { foreignKey: "followingId", as: "Followers" });

Follow.belongsTo(User, { foreignKey: "followerId", as: "Follower" });
Follow.belongsTo(User, { foreignKey: "followingId", as: "Following" });

export { Follow };
