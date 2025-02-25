//Imports
import express from "express";
import Cart from "../Models/cart.js";
import mongoose from "mongoose";
import Product from "../Models/product.js";
import { validateCart, authenticateJWT} from "../Middleware/validate.js";

const cartRouter=express.Router();

//Cart Routes
//All products
cartRouter.get("/",authenticateJWT,async(req,res)=>{
    const products=await Cart.findOne({userId:req.user.id});
    res.json(products);
});
//Add a new Product
cartRouter.post("/",authenticateJWT,validateCart,async(req,res)=>{
    const {productId,quantity}=req.body;
    const product=await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not available' });
    }
    let cart=await Cart.findOne({userId:req.user.id});
    if(!cart){
        cart=new Cart({userId:req.user.id,items:[]});
    }
    // Check if product already exists in cart
    const existingItem = cart.items.find(item => item.productId == productId);
    if (existingItem) {
        return res.status(400).json({ message: "Product already in cart. Use PUT to update quantity." });
    }
    cart.items.push({productId,quantity});
    await cart.save();
    res.json({message:"Product added to cart succesfully",cart});
});
//Update existing Cart Product
cartRouter.put("/",authenticateJWT,validateCart,async(req,res)=>{
    const {productId, quantity}=req.body;
    const cart=await Cart.findOne({userId:req.user.id});
    if(!cart){
        return res.status(404).json({message:"User does not have a cart"});
    }
    if (!cart.items || cart.items.length === 0) {
        return res.status(404).json({ message: "Your cart has no items to update." });
    }
    const item=cart.items.find(item=>item.productId==productId);
    if(!item){
        return res.status(404).json({message:"Item does not exist in cart"});
    }
    item.quantity=quantity;
    await cart.save();
    res.json({message:"Cart updated successfully",cart});
});
//Delete a Product from Cart
cartRouter.delete("/:id",authenticateJWT,async(req,res)=>{
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(item => item.productId != req.params.id);
    await cart.save();
    res.json({message:"Product deleted successfully",cart});
});

export default cartRouter;