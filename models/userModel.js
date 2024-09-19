const { DataTypes } = require("sequelize");
const sq = require("../config/dbconnection"); // database connection

const User = sq.define("user",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    }, 

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.sync().then(() => {
    console.log("user model synced");
});

module.exports = User;