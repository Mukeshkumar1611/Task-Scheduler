const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("../models/taskModel");
const taskScheduler = require("../task_scheduler");
const logger = require("../utils/logger");

// @desc Add a task to the queue
// @route POST api/add-task
// @access Private
const addTask = asyncHandler(async (req, res) => {
    const endpoint = req.query.endpoint;
    let delay = req.body.delay;
    if (delay === undefined || delay === null || isNaN(delay) || delay <= 0) {  
        delay = 50;
    }

    const status = "queued";

    if(!endpoint){
        throw new Error("Endpoint can not be empty");
    }

    // bearer token extraction and verification
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("Bearer token not valid");
            }
        });
    }

    if(!token){
        res.status(401);
        throw new Error("Bearer token is missing");
    }

    const hashedToken = await bcrypt.hash(token, 10);

    const task = await Task.create({
        endpoint,
        delay,
        bearerToken: hashedToken,
        status,
    }); 
    
    // add task to the queue

    const currentTime = Date.now();
    const executionTime = currentTime + delay;
    const currentTimeInDate = Date(currentTime);

    const delayInSec = Math.floor(delay / 1000);

    taskScheduler.addTask(task.id, executionTime);
    console.log(`\n[ Task ${task.id} ] added to queue at time ${currentTimeInDate} with ${delayInSec} seconds delay`);

    logger.info(`[ Task ${task.id} ] added to queue at time ${currentTimeInDate} with ${delayInSec} seconds delay`);
    // logger.info({
    //     message: "task added to queue",
    //     task: task.dataValues,
    // });

    res.status(200).json({
        message: "task added to queue",
        task: task.dataValues,
    });
});

// @desc Get all tasks
// @route GET /api/tasks
// @access public
const getAllTasks = asyncHandler(async (req, res) =>{
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    }

    catch(err){
        res.status(500).json(err.message);
    }
});

// @desc Delete all tasks
// @route DELETE /api/tasks
// @access Public
// const deleteAllTasks = asyncHandler(async (req, res) =>{
//     try {
//         await Task.destroy({
//             where: {},
//             truncate: true,
//         });
//         res.status(200).json({
//             message: "all tasks deleted",
//         });
//     }

//     catch(err){
//         res.status(500).json(err.message);
//     }
// }); 

// @desc Get all tasks by status
// @route GET /api/tasks/:status
// @access public
const getTasksByStatus = asyncHandler(async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: {status: req.params.status},
        });
        res.status(200).json({
            message: `all tasks with status: ${req.params.status}`,
            tasks,
        });
    }

    catch(err){
        res.status(500).json(err.message);
    }
});

module.exports = {
    addTask, 
    getAllTasks,
    // deleteAllTasks,
    getTasksByStatus,
};