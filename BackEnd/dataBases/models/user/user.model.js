import { DataTypes } from "sequelize";
import { connection } from "../../dbConnection.js";

export const userModel = connection.define("user", {
    username: { type: DataTypes.STRING(200), allowNull: false },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    password: {
      type: DataTypes.STRING(300),
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user'
    },
  });