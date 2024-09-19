const connection = require("./dbconnection");

const connectDatabase = async () => {
    try {
        await connection.authenticate();
        console.log("Database connected");
    } catch (error) {
        console.error(error);
    }
};

module.exports = connectDatabase;