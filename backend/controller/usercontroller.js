import User from "../model/userschema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createUser = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, phone, password, role } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { name }] });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hash, phone, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully.", user: newUser });
        console.log("newUser", newUser);

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password, remember } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        
        let token;

        if (remember) {
            token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET || "secretkey", { expiresIn: '7d' });
            res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        }

        else {
            token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET || "secretkey", { expiresIn: '1d' });
            res.cookie("token", token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 });
        }

        res.status(200).json({ message: "Login successful.", user: user, token: token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error.",error });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};


export const verifyToken = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "secretkey");
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: "Invalid token." });
        }

        res.status(200).json({ user: user });
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: "Invalid token." });
    }
};


export const addpunch = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!Array.isArray(user.logs)) {
            user.logs = [];
        }

        const today = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();

        let logIndex = user.logs.findIndex((log) => log.date === today);
        let currentlog;

        if (logIndex !== -1) {
            if (!Array.isArray(user.logs[logIndex].punchs)) {
                user.logs[logIndex].punchs = [];
            }
            user.logs[logIndex].punchs.push(currentTime);
            currentlog = user.logs[logIndex];
        } else {
            const newlog = {
                date: today,
                punchs: [currentTime],
                status: "pending"
            };
            user.logs.unshift(newlog);
            currentlog = newlog;
        }

        await user.save();

        return res.status(200).json({ message: "Punch added successfully", log: currentlog });
    } catch (error) {
        console.error("Error in addpunch:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const works = async (req, res) => {
    try {
        const id = req.body.id;
        console.log("iddddddddddddddddddddddddddddd" , req.body)
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Working On", works: user.workingOn });
    } catch (error) {
        console.error("Error in works:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const workstatus = async (req, res) => {
    try {
        console.log("workstatus" , req.body)
        const { userid , objid } = req.body;
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
     user.workingOn.find(work => work._id.toString() === objid).status = !user.workingOn.find(work => work._id.toString() === objid).status;
        console.log("user.workingOn" , user.workingOn)
        await user.save();
        res.status(200).json({ message: "Work status", workstatus: user.workingOn });
    } catch (error) {
        console.error("Error in workstatus:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const taskstatus = async (req, res) => {
    try {

        const {userid , objid , taskid} = req.body
        const user = await User.findById(userid)
        if(!user){
            res.status(404).json({message : "user not found"})
        }

        user.workingOn.find(work => work._id.toString() === objid).task.find(task => task._id.toString() === taskid).status = !user.workingOn.find(work => work._id.toString() === objid).task.find(task => task._id.toString() === taskid).status
        await user.save()
        res.status(200).json({message : "task status updated", taskstatus : user.workingOn})
        
    } catch (error) {
        console.log("error in add taskstatus")
        res.status(500).json({message : "server error"})
    }
}