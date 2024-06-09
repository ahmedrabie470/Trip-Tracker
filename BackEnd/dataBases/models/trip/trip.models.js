import { DataTypes } from "sequelize";
import { connection } from "../../dbConnection.js";

export const tripModel = connection.define('trip', {
    // Define the properties of the Trip model
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'in_progress', 'completed'),
        defaultValue: 'scheduled'
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false // Adjust as per your requirement
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false // Adjust as per your requirement
    },receivedId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
        model: 'users', 
        key: 'id'
        }
      }
  
});

