import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userid: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String },
    leaveType: { type: String, required: true },
    status : {type : String , default : "pending"}
});

export default mongoose.model('Leave', leaveSchema);