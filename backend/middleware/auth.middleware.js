import jwt from "jsonwebtoken";
import User from "../model/userschema.js";
import dotenv from "dotenv";
dotenv.config();
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            
            throw new Error("harshad")
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "secretkey");
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: "Invalid token." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(401).json({eror : "not"});
    }
} 