import mongoose from "mongoose";

const dailyworkschema = new mongoose.Schema({
    id: String,
    work: [
        {
            date: String,
            time: String,
            work: String,
            project: { type: String, default: "others" },
        }
    ]
})

export default mongoose.model("dailywork", dailyworkschema);