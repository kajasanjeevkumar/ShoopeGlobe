//Import Mongoose
import mongoose from "mongoose";

//Define Schema
const userSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items: [{ productId: String, quantity: Number }]
});

const Cart=mongoose.model("Cart",userSchema);
export default Cart;