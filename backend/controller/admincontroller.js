import User from "../model/userschema.js";
import leaves from "../model/leaveschema.js";

export const getallprojects = async (req, res) => {
    res.status(200).json({ message: "all projects" })
}


export const getallusers = async (req, res) => {

    const allusers = await User.find()

   let userdata = []
     for (let i = 0; i < allusers.length; i++) {
        userdata.push({name : allusers[i].name , img : allusers[i].profileimg})
     }

     res.status(200).json({userdata})
}


export const verifyisadmin = async (req , res)=>{
    try {

        const {id} = req.body

        if(!id) res.status(400).json({message : "user id require"});

        const user = await User.findById(id)

        if(!user) res.status(422).json({message : "user not found"});

        const leave = await leaves.find({status : "pending"})

        // console.log("leaves => " , leave)

        if(user.isadmin) res.status(200).json({message : "true" , pendingleaves : leave.length})
        
    } catch (error) {
        res.status(500).json({message : "error in vryfy admin"})
    }
}