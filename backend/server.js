import express from "express";
import connectDB from "./db/db.js";
import userRouter from "./routes/userrouts.js";
import chatRouter from "./routes/chatrouts.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./controller/chatcontroller.js";
const app = express();
const PORT = 5000;
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

socketHandler(io);




app.use("/users", userRouter);
app.use("/chat", chatRouter);
connectDB().then(() => {
    server.listen(PORT, () => { 
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to DB:", err);
});
