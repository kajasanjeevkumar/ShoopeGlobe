import { body, validationResult } from 'express-validator';
import jwt from "jsonwebtoken";

//Check if body is valid when Register,Login
export const validateUser=[
    body('username').trim().notEmpty().withMessage('Enter Valid Username'),
    body('password').trim().notEmpty().withMessage('Enter Valid Password'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
//Check if user is LoggedIn
export const authenticateJWT=(req,res,next)=>{
    const token=req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Please kindly login" });
    }
    try{
        const decoded=jwt.verify(token.split(" ")[1], "secretKey");
        req.user=decoded;
        next();
    }
    catch(err){
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
}
//Check if body data is valid
export const validateCart = [
    body('productId').trim().notEmpty().isMongoId().withMessage('Invalid product ID'),
    body('quantity').notEmpty().isInt({ min: 1 }).withMessage('Quantity is required and must be at least 1'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg});
        }
        next();
    }
];

