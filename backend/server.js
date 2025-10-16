process.env.TZ = 'Asia/Kolkata';
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/db.js";
import userRouter from "./routes/userrouts.js";
import chatRouter from "./routes/chatrouts.js";
import worksRouter from "./routes/worksrouts.js";
import adminRouter from "./routes/adminrouts.js";
import superadminrouts from "./routes/superadminrouts.js"
import Jobs from "./routes/jobsrouts.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./controller/chatcontroller.js";
// import faceRouter from "./routes/facerout.js";
import leaverouts from "./routes/leaverouts.js"

import moment from "moment-timezone"
const indiaTime = moment().tz("Asia/Kolkata").format();

const app = express();
const PORT = 5000;
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: process.env.VITE_APP_URL,
        credentials: true
    }
});

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,               
}));

socketHandler(io);
app.set('trust proxy', 1)
app.use("/users", userRouter);
app.use("/chat", chatRouter);
// app.use("/face", faceRouter);
app.use("/works" , worksRouter);
app.use("/admin" , adminRouter)
app.use("/leave" , leaverouts)
app.use("/superadmin" , superadminrouts)
app.use("/jobs" , Jobs)

connectDB().then(() => {
    server.listen(PORT, () => { 
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to DB:", err);
});
