import { DataTypes } from "sequelize";
import { connection } from "../../dbConnection.js";

export const staticTripModel = connection.define('staticTrip', {
    // Define the properties of the staticTripModel
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
        allowNull: false  
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false 
    },
    img: {
        type: DataTypes.STRING 
    },
  
});

