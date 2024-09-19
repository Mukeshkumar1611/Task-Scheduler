const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 8000;
const errorHandler = require("./middleware/errorhandler")
const taskHandlerRouter = require("./routes/taskHandlerRoutes");
const dummyApiRouter = require("./routes/dummyApiRoutes");
const userRouter = require("./routes/userRoutes");
const connectDatabase = require("./config/connectDatabase");

const app = express();
app.use(express.json()); // for parsing json data sent in request body
app.use(errorHandler);
app.use("/api", taskHandlerRouter);
app.use("/dummy-api", dummyApiRouter);
app.use("/api/user", userRouter);

connectDatabase();

app.get("/", async (req, res) => {
    res.status(200).send('<p>Welcome to task-scheduler api. Checkout <a href="https://github.com/Rohit2593/task-scheduler/blob/main/README.md">this</a> for more details.</p>');
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});