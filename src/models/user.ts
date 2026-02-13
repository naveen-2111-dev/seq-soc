import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  profileImage?: string;
  fullName?: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
    declare id: number;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare passwordHash: string;
    declare profileImage?: string;
    toJSON() {
        const attribute = { ...this.get() };
        attribute.fullName = this.fullName;
        return attribute;
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
    }
);
