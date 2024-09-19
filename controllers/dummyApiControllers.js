const asyncHandler = require("express-async-handler");

// @desc: dummy api for making successful api calls
// @route: GET /dummy-api/successful
// @access: Public
const successfulTask = asyncHandler(async (req, res) => {
    res.status(200).json({message: "task successfully completed"});
});

// @desc: dummy api for making failed api calls
// @route: GET /dummy-api/failed
// @access: Public
const failedTask = asyncHandler( async (req, res) => {
    res.status(500).json({message: "task failed"});
});

module.exports = {successfulTask, failedTask};