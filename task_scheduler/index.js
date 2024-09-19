const schedule = require('node-schedule');
const axios = require("axios");
const Task = require("../models/taskModel");
const logger = require('../utils/logger');

class TaskScheduler {
    constructor() {
        this.schedule = schedule;
    }

    async addTask(taskId, executionTime){
        const job = this.schedule.scheduleJob(executionTime, async () => {
            const time = Date(Date.now());
            console.log(`\n[ task ${taskId} ] Executing  at time ${time}`);
            logger.info(`[ task ${taskId} ] Executing  at time ${time}`)

            let task;
            try {
                task = await Task.findByPk(taskId);

                if(!task){
                    throw new Error("task not found");
                }
            }

            catch(err){
                console.log(err.message);
            }

            console.log("API endpoint: ", task.endpoint);

            try {
                const response = await axios.get(task.endpoint);
                if(response.status == 200){
                    console.log(`\n[ task ${task.id} ] complete`);
                    logger.info(`[ task ${task.id} ] complete`);
                    task.status = "complete";
                    await task.save();
                }

                else{
                    console.log(`\n[ task ${task.id} ] failed\n`);
                    logger.info(`[ task ${task.id} ] failed\n`);
                    task.status = "failed";
                    await task.save();
                }
            }

            catch(err){
                console.log(`\n [ task ${task.id}]`, err.message);
                logger.info(` [ task ${task.id}] : ${err.message}`);
                task.status = "failed";
                await task.save();
            }
        });
    }
}

const taskScheduler = new TaskScheduler();

module.exports = taskScheduler;