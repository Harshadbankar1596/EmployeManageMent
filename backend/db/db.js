import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Employee");
        console.log("Employee DB connected successfully to localhost");
    } catch (error) {
        console.error("Employee DB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;

