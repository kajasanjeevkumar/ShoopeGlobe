import express from "express";
import mongoose from "mongoose";
import productRouter from "./Routes/products.js";
import cartRouter from "./Routes/cart.js";
import authRouter from "./Routes/auth.js";

const app=new express();
app.use(express.json());
//Connect to db and verify
mongoose.connect('mongodb://localhost:27017/shoppyglobe');
const db=mongoose.connection;
db.on("open",()=>{
    console.log("Connection success");
});
db.on("error",()=>{
    console.log("Connection failed");
});
//Routing
app.use('/auth',authRouter);
app.use('/products',productRouter);
app.use('/cart',cartRouter);
//port specifying
app.listen(5100,()=>{
    console.log("Server is running on port 5100");
});
