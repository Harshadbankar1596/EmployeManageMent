import User from "../model/userschema.js";
import project from "../model/projectschema.js";
import leaves from "../model/leaveschema.js";
import dailywork from "../model/dailyworkschema.js";
import { equal } from "@tensorflow/tfjs";


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
        const employees = await await User.find().length

        if (!user) res.status(422).json({ message: "user not found" });

        const leave = await leaves.find({ status: "pending" })

        if (user.isadmin === "admin") res.status(200).json({ message: "true", pendingleaves: leave.length})

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
        for (let i = 0; i < obj.membersid.length; i++) {
            try {
                let newwork = await User.findById(obj.membersid[i])

                const pro = {
                    projectid: projectid,
                    title: obj.details.title,
                    task: [],
                    members: obj.membersid,
                    status: false,
                    startdate: obj.details.startDate,
                    enddate: obj.details.endDate,
                }

                newwork.workingOn.unshift(pro)
                await newwork.save()
            } catch (error) {
                console.log("errorin save user work", error)
            }
        }

        res.status(200).json({ message: "Project Delevered" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}

export const getallprojects = async (req, res) => {
    try {

        const allproject = await project.find()

        if (!allproject) return (json({ message: "404" }));

        res.status(200).json({ message: "all projext", allprojects: allproject })

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

export const getproject = async (req, res) => {
    try {
        console.log(req.body)

        const { projectid } = req.body

        if (!projectid) res.status(400).json({ message: "Id Not Find" });

        const projectdetail = await project.findById(projectid)

        if (!projectdetail) res.status(422).json({ message: "Project Not Find" });

        res.status(200).json({ project: projectdetail })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}

export const addmember = async (req, res) => {
    try {

        console.log(req.body)
        const memberId = req.body.data[0].memberId
        const projectid = req.body.data[0].projectid

        if (!projectid || !memberId) res.status(400).json({ message: "memberId or project id ARE require" });

        const newproject = await project.findById(projectid)

        if (!newproject.members.includes(memberId)) {
            newproject.members.unshift(memberId);
        }

        if (!newproject) res.status(422).json({ message: "Project not Found" })

        const user = await User.findById(memberId)

        user.workingOn.push({
            projectid: projectid,
            title: newproject.title,
            task: [],
            members: newproject.members,
            status: newproject.status,
            startdate: newproject.startdate,
            enddate: newproject.enddate
        })

        await newproject.save()
        await user.save()

        res.status(200).json({ message: "Member added Sucssesfully" })

    } catch (error) {
        console.log("error in add member =>", error)
        res.status(500).json({ mesage: "Server Error" })
    }
}

export const getallmembersname = async (req, res) => {
    const users = await User.find();
    const names = users.map((user) => ({
        name: user.name,
        id: user._id,
    }));
    res.status(200).json({ usersname: names });
}

export const addtask = async (req, res) => {
    try {

        console.log("add task => ", req.body)

        const { userid, projectid, task } = req.body

        if (!userid || !projectid || !task) res.status(400).json({ message: "userid projectid and task are not found" });

        const user = await User.findById(userid)

        if (!user) res.status(422).json({ message: "user not found" });

        const projectWork = user.workingOn.find(work => work.projectid === projectid);

        if (projectWork) {
            if (projectWork.task && projectWork.task.length > 0) {
                projectWork.task.push({ title: task, status: false });
            } else {
                projectWork.task = [{ title: task, status: false }];
            }
        }
        await user.save()

        res.status(200).json({ message: "task addes" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "erver error : " + error })
    }
}

export const employee = async (req, res) => {
    try {

        const { userid } = req.body

        if (!userid) res.status(400).json({ message: "UserId Not Found" });

        const user = await User.findById(userid)

        if (!user) res.status(422).json({ mesage: "Invalid Id" });

        res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" })
    }
}

export const getemployeedailyreport = async (req, res) => {
    try {

        const { userid } = req.body

        if (!userid) res.status(400).json({ message: "User Id Requred" });

        const work = await dailywork.findOne({ id: userid })

        if (!work) res.status(422).json({ message: "Invalid UserId" });

        res.status(200).json({ message: "Work Finded", work })

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}