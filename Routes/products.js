//Imports
import express from "express";
import Product from "../Models/product.js";
import mongoose from "mongoose";
const productRouter=express.Router();

//Product Routes
//All products
productRouter.get("/",async(req,res)=>{
    const products=await Product.find();
    res.json(products);
});
//Single product with Id
productRouter.get("/:id",async (req,res)=>{
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: "Invalid Product ID format" });
    }
    const product=await Product.findById(id);
    if(!product){
        res.status(404).json({message:"Product not found"});
    }
    res.json(product);
});

export default productRouter;