import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance using environment variables
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT;

if (!dbDialect) {
  throw new Error('DB_DIALECT environment variable is not set.');
}

export const connection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});