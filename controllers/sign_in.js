const User= require("../models/userModel")
 const bcrypt=require('bcrypt');
const erroraHandler = require("../utils/error");
const jwt=require('jsonwebtoken')
const signin=async(req,res,next)=>{
   const {phone_number}=req.body;
   try {
      const validUser=await User.findOne({phone_number});
      if(!validUser){
         return next(erroraHandler(404,"User not find!"));
      }
     
      const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
      res.cookie('access_token',token,{httpOnly:true}).status(200).json({user: validUser, token} )

   } catch (error) {
      next(error);
   }
}
module.exports=signin