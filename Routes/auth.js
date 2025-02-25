import express from "express";
import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import { validateUser } from "../Middleware/validate.js";

const authRouter=express.Router();
//Register new User
authRouter.post("/register",validateUser,async(req,res)=>{
    const {username,password}=req.body;
    const newUser=new User({username,password});
    await newUser.save();
    res.json({user:newUser,message:"User Registered"});
});
//Login User
authRouter.post("/login",validateUser,async(req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username,password});
    if(!user){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    const token=jwt.sign({id:user._id},"secretKey",{expiresIn:'1h'});
    res.json({token});
});
export default authRouter;