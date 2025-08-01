import User from "../model/userschema.js";


export const getallprojects = async (req, res) => {
    res.status(200).json({ message: "all projects" })
}


export const getallusers = async (req, res) => {

    const allusers = await User.find()

    // console.log(allusers)
   let userdata = []
     for (let i = 0; i < allusers.length; i++) {
        userdata.push({name : allusers[i].name , img : allusers[i].profileimg})
     }

     res.status(200).json({userdata})
}