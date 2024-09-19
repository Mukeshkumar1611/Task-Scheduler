const { DataTypes } = require("sequelize");
const sq = require("../config/dbconnection"); // database connection

const Task = sq.define("task", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },

    endpoint: {
        type: DataTypes.STRING,
        field: 'endpoint',
        allowNull: false,
    },

    bearerToken: {
        type: DataTypes.STRING,
        allowNull: false
    },

    delay: {
        type: DataTypes.INTEGER,
    },

    status: {
        type: DataTypes.STRING,
    },
    
});

Task.sync().then(() => {
    console.log("task model synced");
});

module.exports = Task;
