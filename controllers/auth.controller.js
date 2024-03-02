const userModel= require("../models/userModel")
 const bcrypt=require('bcrypt');
const erroraHandler = require("../utils/error");
const jwt=require('jsonwebtoken')



const signup=async(req,res,next)=>{
 const { phone_number, priority } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({ phone_number });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user document
        const newUser = new userModel({ phone_number,priority });
        await newUser.save();

        
        res.status(201).json({ message: "User registered successfully",id:newUser._id });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



module.exports=signup
