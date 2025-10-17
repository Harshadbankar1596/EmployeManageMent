import leaveschema from "../model/leaveschema.js";

export const applyleaves = async (req , res) =>{
    try {
        // console.log(req.body)

        const newleaveapply = new leaveschema({
            name : req.body.formData.name,
            userid : req.body.id,
            startDate : req.body.formData.startDate,
            endDate : req.body.formData.endDate,
            description : req.body.formData.description,
            leaveType : req.body.formData.leaveType
        })

        await newleaveapply.save()

        res.status(200).json({newleaveapply})
        
    } catch (error) {
        res.status(500).json({message : "error in apply leave"})
        console.log("error in apply leave")
    }
}

export const getallleavs = async (req , res) =>{
    
    try {

        const allleavs = await leaveschema.find()

        if(!allleavs) res.status(404).json({message : "not found leavs"});

        res.status(200).json({message : "all leavs" , allleavs : allleavs.reverse()})
        
    } catch (error) {

        res.status(500).json({message : "error in fetch all leavs"})

    }

}

export const allleavs = async (req , res) =>{

    try {

        const {userid} = req.body

        if(!userid) res.status(400).json({message : "user not"})

        const allleavs = await leaveschema.find({userid : userid})

        if(!allleavs) res.status(422).json({message : "not found leavs"});

        // console.log(allleavs)

        res.status(200).json({message : "all leavs" , allleavs : allleavs})
        
    } catch (error) {

        res.status(500).json({message : "error in fetch all leavs"})

    }

}

export const approved = async (req , res)=>{
    try {

        const {id} = req.body

        if(!id) res.status(400).json({message : "leave id require"});

        const Leave = await leaveschema.findById(id)

        if(!Leave) res.status(422).json({message : "leave not find"});

        Leave.status = "approved"

        await Leave.save()

        res.status(200).json({message : "leave acsepted"})
        
    } catch (error) {
        res.status(500).json({message : "error in acsept leave"})
    }
}

export const rejectleave = async (req , res)=>{
    try {

        const {id} = req.body

        if(!id) res.status(400).json({message : "id not found"});

        const leave = await leaveschema.findById(id);

        if(!leave) res.status(422).json({message : "invalid id"});

        leave.status = "reject"

        await leave.save()

        res.status(200).json({message : "rejected leave done" , leave : leave})
        
    } catch (error) {
        console.log("error in reject leave")
        res.status(500).json({message : "error in reject leave req"})
    }
}