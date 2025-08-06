// import jwt from "jsonwebtoken";
// import User from "../model/userschema.js";
// import dotenv from "dotenv";
// dotenv.config();
// export const authMiddleware = async (req, res, next) => {
//     try {
//         console.log("Cookies:", req.cookies);
// console.log("Token:", req.cookies.token);

//         const token = await req.cookies.token;
        
//         if (!token) {
//             return res.status(401).json({message : "token missing"})
//         }

//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "secretkey");
//         const user = await User.findById(decoded.id).select('-password');
        
//         if (!user) {
//             return res.status(401).json({ message: "Invalid token." });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.error("Auth middleware error:", error);
//         res.status(401).json({eror : "not aoutorized"});
//     }
// } 

import jwt from "jsonwebtoken";
import User from "../model/userschema.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {

    // console.log("token => ",req.cookies.token)
    const token = req.cookies.token;

    if (!token) {
      console.log("Token missing in cookies");
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "secretkey");

    if (!decoded || !decoded.id) {
      console.log("Token invalid: decoded object missing id");
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("User not found for decoded id:", decoded.id);
      return res.status(401).json({ message: "Invalid token: user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Not authorized" });
  }
};
