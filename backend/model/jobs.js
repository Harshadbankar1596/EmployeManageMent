import mongoose from "mongoose"


const jobshema = new mongoose.Schema({
    name : String,
    phone : Number,
    email : String,
    resume : {data : String , contentType : String},
    role : String
})

const Job = mongoose.model("Job" , jobshema)

export default Job