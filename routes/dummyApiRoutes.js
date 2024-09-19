const express = require("express");
const router = express.Router();
const {
    successfulTask,
    failedTask
} = require("../controllers/dummyApiControllers");

router.route("/successful").get(successfulTask);
router.route("/failed").get(failedTask);

module.exports = router;