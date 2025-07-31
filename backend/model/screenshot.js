import mongoose from "mongoose";
const screenshotSchema = new mongoose.Schema({
    name: String,
    date: String,
    image: {
        data: Buffer,
        contentType: String,
    }
})

export default mongoose.model('Screenshot', screenshotSchema);