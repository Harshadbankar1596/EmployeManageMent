import User from "../model/userschema.js"



export const superadminveryfy = async (req, res) => {
    try {
        const users = await User.find();

        const totalemployee = users.length;

        let presentemployee = 0;

        const today = new Date();
        const todayString = today.toLocaleDateString();

        for (let i = 0; i < users.length; i++) {
            const userLogs = users[i].logs;
            if (Array.isArray(userLogs) && userLogs.length > 0) {
                const hasTodayLog = userLogs.some(log => {
                    if (!log.date) return false;
                    if (log.date instanceof Date) {
                        return log.date.toLocaleDateString() === todayString;
                    }
                    return new Date(log.date).toLocaleDateString() === todayString;
                });
                if (hasTodayLog) {
                    presentemployee++;
                }
            }
        }

        res.status(200).json({
            message: "Success",
            totalemployee,
            presentemployee
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const getallemployees = async (req , res)=> {
    try {
        console.log(req.body)
        const user = await User.find()  
        let userdata = []
        for (let i = 0; i < user.length; i++) {
            let data = {
                name : user[i].name,
                image : user[i].profileimg,
                log : user[i].logs[0],
                userid : user[i]._id
            }
            userdata.push(data)
        }



        res.status(200).json({message : "done" , data : userdata})
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
}


export const getemployeedetail = async (req , res)=>{
    try {

        const {userid} = req.body

        if(!userid) res.status(400).json({message : "Id Are Require"});

        const user = await User.findById(userid)

        if(!userid) res.status(422).json({message : "Invalid Userid"});

        const employee = {
            name : user.name,
            image : user.profileimg,
            logs : user.logs,
            role : user.role,
            email : user.email,
            phone : user.phone
        }

        res.status(200).json({message : "Succsessfull" , employee})
        
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
}