import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    members: [{ type: mongoose.Schema.Types.ObjectId }],
    startdate: { type: Date, required: true },
    enddate: { type: Date },
    status: { type: Boolean, default: false }
});

export default mongoose.model("Project", projectSchema);