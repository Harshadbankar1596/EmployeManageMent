import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
    groupname: String,
    message: [{
        username: String,
        text: String,
        time: Date,
    }],
    members : [{
        userId : String,
        Name : String
    }]
})

export default mongoose.model("Chat", ChatSchema)