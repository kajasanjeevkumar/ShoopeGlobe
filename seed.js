//Insert sample data

//imports
import mongoose from "mongoose";
import User from "./Models/user.js";
import Product from "./Models/product.js";

//connect to mongo & verify
mongoose.connect('mongodb://localhost:27017/shoppyglobe');
const db=mongoose.connection;
db.on("open",()=>{
    console.log("Connection success");
});
db.on("error",()=>{
    console.log("Connection failed");
});
//sample user data
const users=[
    {
        username:"Sanjeev",
        password:"1234"
    },
    {
        username:"Rahul",
        password:"5678"
    }
];
//sample product data
const products=[
        { name: 'Smartwatch', price: 200, description: 'A stylish smartwatch with health tracking features.', stock: 30 },
        { name: 'Gaming Mouse', price: 50, description: 'Ergonomic gaming mouse with customizable buttons.', stock: 50 },
        { name: 'Wireless Keyboard', price: 80, description: 'Compact wireless keyboard with mechanical keys.', stock: 25 },
        { name: 'Bluetooth Speaker', price: 120, description: 'Portable speaker with deep bass and waterproof design.', stock: 40 },
        { name: '4K Monitor', price: 400, description: 'Ultra HD monitor with vibrant colors and fast refresh rate.', stock: 15 }
]
//insert sample user data
const insertedUsers=async()=>{
    try{
        //delete any before data
        await User.deleteMany();
        const insertedUsers=await User.insertMany(users);
        console.log("Inserted Users:",insertedUsers);
    }
    catch(error){
        console.log(error);
    }
}
//insert sample product data
const insertedProducts=async()=>{
    try{
        //delete any before data
        await Product.deleteMany();
        const insertedUsers=await Product.insertMany(products);
        console.log("Inserted Products:",insertedUsers);
    }
    catch(error){
        console.log(error);
    }
}
insertedUsers();
insertedProducts();

