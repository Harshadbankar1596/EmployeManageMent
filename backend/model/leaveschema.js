import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String },
    leaveType: { type: String, required: true },
    status : {type : Boolean , default : false}
});

export default mongoose.model('Leave', leaveSchema);