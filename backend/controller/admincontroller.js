import User from "../model/userschema.js";
import project from "../model/projectschema.js";
import leaves from "../model/leaveschema.js";


export const getallusers = async (req, res) => {

    const allusers = await User.find()

    let userdata = []
    for (let i = 0; i < allusers.length; i++) {
        // userdata.push({ name: allusers[i].name, userid: allusers[i]._id })
        userdata.push({ name: allusers[i].name, img: allusers[i].profileimg, userid: allusers[i]._id })
    }

    res.status(200).json({ userdata })
}

export const verifyisadmin = async (req, res) => {
    try {

        const { id } = req.body

        if (!id) res.status(400).json({ message: "user id require" });

        const user = await User.findById(id)

        if (!user) res.status(422).json({ message: "user not found" });

        const leave = await leaves.find({ status: "pending" })

        // console.log("leaves => " , leave)

        if (user.isadmin) res.status(200).json({ message: "true", pendingleaves: leave.length })

    } catch (error) {
        res.status(500).json({ message: "error in vryfy admin" })
    }
}

export const addproject = async (req, res) => {
    try {
        // console.log("obj => " , req.body.obj)

        const { obj } = req.body

        if (!obj) return res.status(400).json({ message: "data are required" });

        const work = {
            title: obj.details.title,
            startdate: obj.details.startDate,
            enddate: obj.details.endDate,
            members: obj.membersid,
            status: false,
        }

        const newProject = new project(work)

        let projectid = ""

        const savedProject = await newProject.save();
        projectid = savedProject._id;
        // console.log(work)
        // console.log(projectid)

        const newprojectas = await project.findById(projectid)
        // console.log(newprojectas)

        for (let i = 0; i < obj.membersid.length; i++) {
            try {
                let newwork = await User.findById(obj.membersid[i])
                // console.log("user finded")
                newwork.workingOn.unshift(newprojectas)
                // console.log("user add work")
               await newwork.save()
            } catch (error) {
                console.log("errorin save user work" , error)
            }
        }
  
        res.status(200).json({message : "Project Delevered"})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error"})
    }
}

export const getallprojects = async (req , res)=>{
    try {
        
        const allproject = await project.find()

        if(!allproject) return(json({message : "404"}));

        res.status(200).json({message : "all projext" , allprojects : allproject})

    } catch (error) {
        res.status(500).json({message : "server error"})
    }
} 

export const getproject = async ( req , res )=> {
     try {
        console.log(req.body)

        const {projectid} = req.body

        if(!projectid) res.status(400).json({message : "Id Not Find"});

        const projectdetail = await project.findById(projectid)

        if(!projectdetail) res.status(422).json({message : "Project Not Find"});

        res.status(200).json({project : projectdetail})
        
     } catch (error) {
        console.log(error)
        res.status(500).json({message : "Server Error"})
     }
}

export const addmember = async (req , res) => {
    try {

        const {projectid , userid} = req.body

        if(!projectid || !userid) res.status(400).json({message : "userid or project id ARE require"});

        const newproject = await project.findById(projectid)

        newproject.members.unshift(userid)

        if(!newproject) res.status(422).json({message : "Project not Found"})

        await newproject.save()

        res.status(200).json({message : "Member added Sucssesfully"})
        
    } catch (error) {
        res.status(500).json({mesage : "Server Error"})
    }
}