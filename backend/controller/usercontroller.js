process.env.TZ = 'Asia/Kolkata';
import User from "../model/userschema.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import Screenshot from "../model/screenshot.js";
dotenv.config();

export const createUser = async (req, res) => {
    // console.log(req.body);
    try {

        const { name, email, phone, password, role } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { name }] });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hash, phone, role });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully.", user: newUser });
        // console.log("newUser", newUser);
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

export const loginUser = async (req, res) => {

    try {
        const { email, password, remember } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
            // console.log("not match password : ", password)
        }

        let token;

        if (remember) {
            token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET || "secretkey", { expiresIn: '7d' });
            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
        }

        else {
            token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET || "secretkey", { expiresIn: '1d' });
            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 1 * 24 * 60 * 60 * 1000 });
        }

        let userdata = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            id: user._id,
            isadmin: user.isadmin
        }


        res.status(200).json({ message: "Login successful.", user: userdata, token: token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error.", error });
    }
};
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

export const verifyToken = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({ message: "No token provided." });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "secretkey");

        // console.log("veryfy tocen decoded line 103 => " , decoded)

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(422).json({ message: "Invalid token." });
        }

        let userdata = {
            // name: user.name,
            // email: user.email,
            // phone: user.phone,
            // role: user.role,
            logs: Array(user.logs[0]) || [],
            id: user._id,
        }

        res.status(200).json({ user: userdata });

    } catch (error) {
        console.error("Token verification error:", error);
        res.status(500).send({ message: "Invalid token."+error.message });
    }

};

// export const addpunch = async (req, res) => {
//     try {
//         const {id} = req.body;

//         const today = new Date().toLocaleDateString();
//         const currentTime = new Date().toLocaleTimeString();

//         const user = await User.findById(id);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const logIndex = user.logs.findIndex(log => log.date === today);

//         let todaypunches = [];
//         if (logIndex !== -1) {
//             todaypunches = user.logs[logIndex].punchs ? [...user.logs[logIndex].punchs] : [];
//         }

//         // Add the new punch
//         todaypunches.push(currentTime);

//         // Calculate total worked hours from todaypunches
//         let totalMs = 0;
//         for (let i = 0; i < todaypunches.length; i += 2) {
//             const start = todaypunches[i];
//             const end = todaypunches[i + 1];
//             if (start && end) {
//                 // Parse time strings to Date objects (using today's date)
//                 const todayDate = new Date();
//                 const [startTime, startPeriod] = start.split(' ');
//                 const [endTime, endPeriod] = end.split(' ');
//                 const [startH, startM, startS] = startTime.split(':').map(Number);
//                 const [endH, endM, endS] = endTime.split(':').map(Number);

//                 let startHour = startH % 12 + (startPeriod === 'PM' ? 12 : 0);
//                 if (startPeriod === 'AM' && startH === 12) startHour = 0;
//                 let endHour = endH % 12 + (endPeriod === 'PM' ? 12 : 0);
//                 if (endPeriod === 'AM' && endH === 12) endHour = 0;

//                 const startDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), startHour, startM, startS);
//                 const endDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), endHour, endM, endS);

//                 // If end is before start (shouldn't happen, but just in case), skip
//                 if (endDate > startDate) {
//                     totalMs += endDate - startDate;
//                 }
//             }
//         }
//         // If odd number of punches, treat last as start with no end, so don't add
//         const totalHours = totalMs / (1000 * 60 * 60);

//         // Determine status
//         let newStatus = "pending";
//         if (totalHours >= 8) {
//             newStatus = "present";
//         } else if (totalHours >= 4) {
//             newStatus = "halfday";
//         }

//         if (logIndex !== -1) {
//             const punchPath = `logs.${logIndex}.punchs`;
//             const statusPath = `logs.${logIndex}.status`;

//             await User.updateOne(
//                 { _id: id },
//                 {
//                     $set: { [punchPath]: todaypunches, [statusPath]: newStatus }
//                 }
//             );
//         } else {
//             const newlog = {
//                 date: today,
//                 punchs: [currentTime],
//                 status: "pending"
//             };

//             await User.updateOne(
//                 { _id: id },
//                 { $push: { logs: { $each: [newlog], $position: 0 } } }
//             );
//         }

//         return res.status(200).json({ message: "Punch added successfully" });

//     } catch (error) {
//         console.error("Error in addpunch:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

export const addpunch = async (req, res) => {
    try {
      const { id } = req.body;
  
      const now = new Date();
      const today = now.toLocaleDateString();
      const currentTime = now.toLocaleTimeString();
  
      
      const user = await User.findById(id, { logs: 1 });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      
      const logIndex = user.logs.findIndex(log => log.date === today);
      let todaypunches = logIndex !== -1 ? [...user.logs[logIndex].punchs] : [];
      todaypunches.push(currentTime);
  
    
      let totalMs = 0;
      for (let i = 0; i < todaypunches.length - 1; i += 2) {
        const start = new Date(`${today} ${todaypunches[i]}`);
        const end = new Date(`${today} ${todaypunches[i + 1]}`);
        if (end > start) totalMs += end - start;
      }
      const totalHours = totalMs / 36e5; // 1000*60*60
  
      
      let newStatus = "pending";
      if (totalHours >= 8) newStatus = "present";
      else if (totalHours >= 4) newStatus = "halfday";
  
      if (logIndex !== -1) {
        await User.updateOne(
          { _id: id },
          {
            $set: {
              [`logs.${logIndex}.punchs`]: todaypunches,
              [`logs.${logIndex}.status`]: newStatus,
            },
          }
        );
      } else {
        await User.updateOne(
          { _id: id },
          {
            $push: {
              logs: {
                $each: [{ date: today, punchs: [currentTime], status: "pending" }],
                $position: 0,
              },
            },
          }
        );
      }
  
      res.status(200).json({ message: "Punch added successfully" });
    } catch (error) {
      console.error("Error in addpunch:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
export const works = async (req, res) => {
    try {
        const id = req.body.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Working On", works: user.workingOn });
    } catch (error) {
        console.error("Error in works:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const workstatus = async (req, res) => {
    try {
        // console.log("workstatus", req.body)
        const { userid, objid } = req.body;
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.workingOn.find(work => work._id.toString() === objid).status = !user.workingOn.find(work => work._id.toString() === objid).status;
        // console.log("user.workingOn", user.workingOn)
        await user.save();
        res.status(200).json({ message: "Work status", workstatus: user.workingOn });
    } catch (error) {
        console.error("Error in workstatus:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const addtask = async (req, res) => {
    try {

        const { userid, objid, task } = req.body

        const user = await User.findById(userid)

        if (!user) res.status(404).json({ message: "user not found" });

        user.workingOn.find(work => work._id.toString() === objid).task.unshift({ title: task, status: false })

        let cout = 0

        for (let i = 0; i < user.workingOn.find(work => work._id.toString() === objid).task.length; i++) {
            if (user.workingOn.find(work => work._id.toString() === objid).task[i].status) {
                cout++
            }
        }

        if (cout === user.workingOn.find(work => work._id.toString() === objid).task.length) {
            user.workingOn.find(work => work._id.toString() === objid).status = true
            await user.save()
        }
        else {
            user.workingOn.find(work => work._id.toString() === objid).status = false
            await user.save()
        }

        res.status(200).json({ message: "task added", works: user.workingOn })

    } catch (error) {
        console.log("error in addtask")
        res.status(500).json({ message: "server error" })
    }
}

export const taskstatus = async (req, res) => {
    try {

        const { userid, objid, taskid } = req.body
        const user = await User.findById(userid)
        if (!user) {
            res.status(404).json({ message: "user not found" })
        }

        user.workingOn.find(work => work._id.toString() === objid).task.find(task => task._id.toString() === taskid).status = !user.workingOn.find(work => work._id.toString() === objid).task.find(task => task._id.toString() === taskid).status

        await user.save()

        // console.log("user.workingOn.find(work => work._id.toString() === objid).task", user.workingOn.find(work => work._id.toString() === objid).task)
        let cout = 0

        for (let i = 0; i < user.workingOn.find(work => work._id.toString() === objid).task.length; i++) {
            if (user.workingOn.find(work => work._id.toString() === objid).task[i].status) {
                cout++
            }
        }

        // console.log("cout", cout)
        // console.log("user.workingOn.find(work => work._id.toString() === objid).task.length", user.workingOn.find(work => work._id.toString() === objid).task.length)

        if (cout === user.workingOn.find(work => work._id.toString() === objid).task.length) {
            user.workingOn.find(work => work._id.toString() === objid).status = true
            await user.save()
        }
        else {
            user.workingOn.find(work => work._id.toString() === objid).status = false
            await user.save()
        }

        res.status(200).json({ message: "task status updated", taskstatus: user.workingOn })

    } catch (error) {
        console.log("error in add taskstatus")
        res.status(500).json({ message: "server error" })
    }
};

export const getlogs = async (req, res) => {
    try {

        const { id } = req.body

        const user = await User.findById(id)

        if (!user) res.status(404).json({ message: "user not found" })

        const logs = user.logs

        res.status(200).json({ message: "logs fetched", logs: logs })

    } catch (error) {
        console.log("errror ni getlogs")
        res.status(500).json({ message: "server error" })
    }
};

export const summary = async (req, res) => {
    try {

        const { id } = req.body

        if (!id) res.status(400).json({ message: "id is required" })

        const user = await User.findById(id)

        if (!user) res.status(404).json({ message: "user not found" })


        const totalhours = user.logs
        const presentdays = user.logs.filter((log) => log.status === "present").length
        const halfdays = user.logs.filter((log) => log.status === "halfday").length
        const unactivedays = user.logs.filter((log) => log.status === "pending").length
        // console.log("totalhours" , user.logs.map((log) => log.status === "present" || log.status === "halfday" ? log.punchs : null))

        res.status(200).json({ message: "summary fetched", totalhours, presentdays, halfdays, unactivedays })

    } catch (error) {
        console.log("error in summery", error)
        res.status(500).json({ message: "server error" })
    }
};

export const uploadprofileimg = async (req, res) => {
    try {
        const { id, img } = req.body;
        // console.log("img ============================================== ", img)

        if (!id) {
            return res.status(400).json({ message: "User id is required" });
        }
        if (!img) {
            return res.status(400).json({ message: "Image is required" });
        }

        // Find user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        let matches = img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            return res.status(400).json({ message: "Invalid image format" });
        }
        let contentType = matches[1];
        let imageBuffer = Buffer.from(matches[2], 'base64');

        user.profileimg = {
            data: imageBuffer,
            contentType: contentType
        };

        await user.save();

        res.status(200).json({ message: "Profile image uploaded successfully" });
    } catch (error) {
        console.error("Error uploading profile image:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getimage = async (req, res) => {
    try {

        const { id } = req.body

        const user = await User.findById(id)

        if (!user) res.status(404).json({ message: "user not found" })

        if (!user.profileimg) res.status(404).json({ message: "no image found" })

        res.status(200).json({ message: "image fetched", image: user.profileimg.data })


    } catch (error) {
        console.log("error in getimage")
        res.status(500).json({ message: "server error" })
    }
}

export const updateprofile = async (req, res) => {
    try {

        const { id, data } = req.body

        const user = await User.findById(id)

        if (!user) res.status(404).json({ message: "user not found" })

        user.name = data.name
        user.email = data.email
        user.phone = data.phone

        await user.save()

        let userdata = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            id: user._id,
        }

        res.status(200).json({ message: "profile updated", user: userdata })

    } catch (error) {
        console.log("error in update profile")
    }
}

export const screenshot = async (req, res) => {
    try {
        const { name, date, img } = req.body
        const screenshot = new Screenshot({ name, date, image: { data: img, contentType: "image/png" } })
        await screenshot.save()

        res.status(200).json({ message: "screenshot added" })
    } catch (error) {
        console.log("error in screenshot")
    }
}

export const getallmembers = async (req, res) => {
    try {
        // console.log("get members => " , req.body)
        const { userid, projectid } = req.body;

        if (!userid || !Array.isArray(userid) || userid.length === 0) {
            return res.status(400).json({ message: "userids array is required" });
        }

        const members = await User.find({ _id: { $in: userid } });
        

        if (!members || members.length === 0) {
            return res.status(404).json({ message: "Users Not Found" });
        }



        const membersobj = members.map((user) => {
            const projectInfo = user.workingOn.find((work) => String(work.projectid) === projectid)

            // Debug log for project info of each user
            // console.log('Project info for user', user._id, ':', projectInfo);
            const projectdetail = {
                task : projectInfo?.task,
            }

            return {
                name: user.name,
                img: user.profileimg,
                projectinfo: projectdetail,
                userid : user._id
            };
        });

        res.status(200).json({ members: membersobj });

    } catch (error) {
        res.status(500).json({ message: "Server Error in Fetch All Members"+error });
    }
}