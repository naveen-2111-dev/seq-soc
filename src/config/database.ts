import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DATABASE_NAME;
const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;

if (!dbName || !dbUser || !dbPassword || !dbHost) {
    throw new Error("Database environment variables are missing!");
}

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    logging: false,
});
