const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ 
        where: {
            email,
        },
    });

    if(userAvailable){
        res.status(400);
        throw new Error("Email already in use");
    }   

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user){
        res.status(201).json({
            id: user.id,
            email: user.email
        });
    }

    else{
        res.status(400);
        throw new Error("user data not valid");
    }
});

// @desc Log a user in
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }

    const user = await User.findOne({
        where: {    
            email,  
        },      
    });

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if(!passwordsMatch){
        res.status(401);
        throw new Error("Passwords don't match");
    }

    // user exists and passwords match

    const accessToken = jwt.sign(
        {
            user: {
                    username: user.name,
                    email: user.email,
                    id: user.id
                },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    );
    res.status(200).json({
        accessToken
    });
});


// @desc get a user by id
// @route GET /api/users/get/:id
// @access public
const getUser = asyncHandler( async (req, res) => {
    const user = await User.findOne({
        where: {    
            id: req.params.id,  
        },      
    });

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        message: "user found",
        id: user.id,
    });
});

// @desc Get all users
// @route GET /api/users/get
// @access public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
});

module.exports = {
    registerUser, 
    loginUser,
    getUser,
    getUsers,
};