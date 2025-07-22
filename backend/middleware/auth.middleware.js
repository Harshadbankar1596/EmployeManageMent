import jwt from "jsonwebtoken";
import User from "../model/userschema.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            
            throw new Error("harshad")
        }

        const decoded = jwt.verify(token, "secretkey");
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