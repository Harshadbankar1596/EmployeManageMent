// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// const connectDB = async () => {
//     try {
//         if (!MONGO_URL) {
//             throw new Error("MONGO_URL environment variable is not defined");
//         }
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log("Employee DB connected successfully to", MONGO_URL);
//     } catch (error) {
//         console.error("Employee DB connection error:", error);
//         process.exit(1);
//     }
// };

// export default connectDB;


import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL environment variable is not defined");
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Employee DB connected successfully to", process.env.MONGO_URL);
    } catch (error) {
        console.error("Employee DB connection error");
        process.exit(1);
    }
}; 

export default connectDB;
