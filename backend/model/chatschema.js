import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
    groupname: String,
    message: [{
        username: String,
        text: String,
        time: Date,
    }]
})

export default mongoose.model("Chat", ChatSchema)