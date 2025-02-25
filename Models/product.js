//Import Mongoose
import mongoose from "mongoose";

//Define Schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description: String,
    stock: Number
});

const Product=mongoose.model("Products",userSchema);
export default Product;