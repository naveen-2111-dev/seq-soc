import { sequelize } from "../models/index.js";

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    await sequelize.sync({ force: false, alter: true });
    console.log("All models were synchronized successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

syncDatabase();
