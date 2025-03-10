//Import Mongoose
import mongoose from "mongoose";

//Define Schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const User=mongoose.model("Users",userSchema);
export default User;