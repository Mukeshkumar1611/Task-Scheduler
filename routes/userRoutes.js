const express = require("express");
const router = express.Router();
const {
    loginUser,
    registerUser,
    getUser,
    getUsers,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/get/:id").get(getUser);
router.route("/get").get(getUsers);

module.exports = router;