process.env.TZ = 'Asia/Kolkata';
import User from "../model/userschema.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import validator from 'validator';
import Screenshot from "../model/screenshot.js";
import nodemailer from "nodemailer";
dotenv.config();
import fs from "fs"
import uploadTheImage from "../utils/cloudinary.js"


export const createUser = async (req, res) => {
    // console.log(req.body);
    try {

        const { name, email, phone, password, role } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ $or: [{ email }] });
        const existingPhone = await User.findOne({ $or: [{ phone }] });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        if (existingPhone) {
            return res.status(409).json({ message: "Phone number already exists." });
        }

        if (!validator.isMobilePhone(phone, ['en-US', 'en-GB', 'es-ES'])) {
            return res.status(400).json({ message: "Invalid phone number." });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email." });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Weak password. Please use a stronger password." });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hash, phone, role });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully.", user: newUser });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: error.message, error: error.message });
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
        }

        let token;

        if (remember) {
            token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET || "secretkey", { expiresIn: '7d' });
            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
        }

        else {
            token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET || "secretkey", { expiresIn: '1d' });
            res.cookie("token", token, {
                httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000
            });
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

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

let otpStore = {}

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendotp = async (req, res) => {
    try {

        const { email } = req.body;
        const otp = generateOTP();
        const expires = Date.now() + 5 * 60 * 1000;
        if (!email) return res.status(400).json({ success: false, message: "Email is required" });

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ success: false, message: "User Not Found" });

        otpStore[email] = { otp, expires };

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            html: `<h2>Your OTP: <b>${otp}</b></h2><p>Valid for 5 minutes.</p>`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.json({ success: true, message: "OTP sent to email" });
        } catch (err) {
            res.json({ success: false, message: "Error sending OTP" + err });
        }
    } catch (error) {
        console.error("OTP sending error:", error);
        res.status(500).json({ message: "Server error." });
    }
}

export const verifyotp = async (req, res) => {

    const { email, otp } = req.body;

    if (otpStore[email] && otpStore[email].otp === otp) {
        const { expires } = otpStore[email];
        if (Date.now() < expires) {
            delete otpStore[email]; // OTP used once
            res.json({ success: true, message: "OTP verified successfully" });
        } else {
            res.json({ success: false, message: "OTP expired" });
        }
    } else {
        res.json({ success: false, message: "Invalid or expired OTP" });
    }
};

export const resetpassword = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) res.status(400).json({ message: "Invalid Data" });

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Weak Password" });
        }
        const hash = await bcrypt.hash(password, 10)

        const user = await User.findOneAndUpdate({ email }, { password: hash })

        if (!user) res.status(422).json({ message: "User Not Found" });

        res.status(200).json({ message: "Password Reset Done" });

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

export const changepassword = async (req, res) => {
    try {

        const { userid, password } = req.body

        if (!userid || !password) res.status(400).json({ message: "Invalid Data" });

        const user = await User.findById(userid);

        if (!user) res.status(422).json({ message: "User Not Found" });

        const hash = await bcrypt.hash(password, 10);

        user.password = hash

        await user.save()

        res.status(200).json({ message: "Password Update Done" })

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

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
        res.status(500).send({ message: "Invalid token." + error.message });
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

// export const addpunch = async (req, res) => {
//     try {

//         console.log(req.body)
//         const { id } = req.body;

      
//         const now = new Date();
//         const today = now.toLocaleDateString();
//         const currentTime = now.toLocaleTimeString();


//         const user = await User.findById(id, { logs: 1 });
//         if (!user) return res.status(404).json({ message: "User not found" });


//         const logIndex = user.logs.findIndex(log => log.date === today);
//         let todaypunches = logIndex !== -1 ? [...user.logs[logIndex].punchs] : [];
//         todaypunches.push(currentTime);


//         let totalMs = 0;
//         for (let i = 0; i < todaypunches.length - 1; i += 2) {
//             const start = new Date(`${today} ${todaypunches[i]}`);
//             const end = new Date(`${today} ${todaypunches[i + 1]}`);
//             if (end > start) totalMs += end - start;
//         }
//         const totalHours = totalMs / 36e5; // 1000*60*60


//         let newStatus = "pending";
//         if (totalHours >= 8) newStatus = "present";
//         else if (totalHours >= 4) newStatus = "halfday";

//         if (logIndex !== -1) {
//             await User.updateOne(
//                 { _id: id },
//                 {
//                     $set: {
//                         [`logs.${logIndex}.punchs`]: todaypunches,
//                         [`logs.${logIndex}.status`]: newStatus,
//                     },
//                 }
//             );
//         } else {
//             await User.updateOne(
//                 { _id: id },
//                 {
//                     $push: {
//                         logs: {
//                             $each: [{ date: today, punchs: [currentTime], status: "pending" }],
//                             $position: 0,
//                         },
//                     },
//                 }
//             );
//         }

//         res.status(200).json({ message: "Punch added successfully" });
//     } catch (error) {
//         console.error("Error in addpunch:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// export const addpunch = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { id, lat, long } = req.body;

//         if (!id || !lat || !long) {
//             return res.status(400).json({ message: "id, lat and long are required" });
//         }

//         // Function to calculate distance using Haversine Formula
//         function getDistanceInMeters(lat1, lon1, lat2, lon2) {
//             const R = 6371000; // Radius of Earth in meters
//             const toRad = (deg) => (deg * Math.PI) / 180;

//             const dLat = toRad(lat2 - lat1);
//             const dLon = toRad(lon2 - lon1);

//             const a =
//                 Math.sin(dLat / 2) ** 2 +
//                 Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//                 Math.sin(dLon / 2) ** 2;

//             const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//             return R * c; // meters
//         }

//         // Static Lat-Long (fixed office location)
//         const staticLat = 19.87562;
//         const staticLon = 75.372421;

//         // check distance
//         const distance = getDistanceInMeters(staticLat, staticLon, lat, long);
//         console.log(`Distance from static point: ${distance.toFixed(2)} meters`);

//         if (distance > 500) {
//             return res.status(403).json({ 
//                 message: "You are not within 200 meters of office location" 
//             });
//         }

//         const now = new Date();
//         const today = now.toLocaleDateString();
//         const currentTime = now.toLocaleTimeString();

//         const user = await User.findById(id, { logs: 1 });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         const logIndex = user.logs.findIndex(log => log.date === today);
//         let todaypunches = logIndex !== -1 ? [...user.logs[logIndex].punchs] : [];
//         todaypunches.push(currentTime);

//         let totalMs = 0;
//         for (let i = 0; i < todaypunches.length - 1; i += 2) {
//             const start = new Date(`${today} ${todaypunches[i]}`);
//             const end = new Date(`${today} ${todaypunches[i + 1]}`);
//             if (end > start) totalMs += end - start;
//         }
//         const totalHours = totalMs / 36e5; // convert ms → hours

//         let newStatus = "pending";
//         if (totalHours >= 8) newStatus = "present";
//         else if (totalHours >= 4) newStatus = "halfday";

//         if (logIndex !== -1) {
//             await User.updateOne(
//                 { _id: id },
//                 {
//                     $set: {
//                         [`logs.${logIndex}.punchs`]: todaypunches,
//                         [`logs.${logIndex}.status`]: newStatus,
//                     },
//                 }
//             );
//         } else {
//             await User.updateOne(
//                 { _id: id },
//                 {
//                     $push: {
//                         logs: {
//                             $each: [{ date: today, punchs: [currentTime], status: "pending" }],
//                             $position: 0,
//                         },
//                     },
//                 }
//             );
//         }

//         res.status(200).json({ message: "✅ Punch added successfully" });
//     } catch (error) {
//         console.error("Error in addpunch:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// Haversine function outside handler for reuse


const R = 6371000; // meters
const staticLat = 19.87562;
const staticLon = 75.372421;

function getDistanceInMeters(lat1, lon1, lat2, lon2) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const addpunch = async (req, res) => {
    try {
        console.log(req.body)
        const { id, lat, long } = req.body;
        if (!id || lat == null || long == null) 
            return res.status(400).json({ message: "id, lat, and long are required" });

        const distance = getDistanceInMeters(staticLat, staticLon, lat, long);
        if (distance > 500)
            return res.status(403).json({ message: "You are not within 200 meters of office location" });

        const now = new Date();
        const today = now.toLocaleDateString();
        const currentTime = now.toLocaleTimeString();

        const user = await User.findById(id, { logs: 1 });
        if (!user) return res.status(404).json({ message: "User not found" });

        const logIndex = user.logs.findIndex(log => log.date === today);

        let updatedLogs;
        if (logIndex !== -1) {
            const punches = [...user.logs[logIndex].punchs, currentTime];
            const totalMs = punches.reduce((acc, punch, i) => {
                if (i % 2 === 1) {
                    const start = new Date(`${today} ${punches[i - 1]}`);
                    const end = new Date(`${today} ${punch}`);
                    if (end > start) acc += end - start;
                }
                return acc;
            }, 0);
            const totalHours = totalMs / 36e5;

            const status = totalHours >= 8 ? "present" : totalHours >= 4 ? "halfday" : "pending";

            await User.updateOne(
                { _id: id },
                { $set: { [`logs.${logIndex}.punchs`]: punches, [`logs.${logIndex}.status`]: status } }
            );

            updatedLogs = punches;
        } else {
            await User.updateOne(
                { _id: id },
                { $push: { logs: { $each: [{ date: today, punchs: [currentTime], status: "pending" }], $position: 0 } } }
            );
            updatedLogs = [currentTime];
        }

        res.status(200).json({ message: "✅ Punch added successfully", log: { date: today, punchs: updatedLogs } });
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

        user.workingOn.find(work => work?._id?.toString() === objid.toString()).task.unshift({ title: task, status: false })

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
        console.log("error in addtask" + error)
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

// export const getlogs = async (req, res) => {
//     try {

//         const { id } = req.body

//         const user = await User.findById(id)

//         if (!user) res.status(404).json({ message: "user not found" })

//         const logs = user.logs

//         res.status(200).json({ message: "logs fetched", logs: logs })

//     } catch (error) {
//         console.log("errror ni getlogs")
//         res.status(500).json({ message: "server error" })
//     }
// };

// controllers/userController.js


export const getlogs = async (req, res) => {
    try {
        const { id, month, year } = req.body; // get month & year from frontend

        if (!id || month === undefined || year === undefined) {
            return res.status(400).json({ message: "id, month and year are required" });
        }

        const user = await User.findById(id);

        if (!user) return res.status(404).json({ message: "User not found" });

        // Filter logs for the requested month & year
        const logs = user.logs.filter(log => {
            const logDate = new Date(log.date);
            return logDate.getMonth() === month && logDate.getFullYear() === year;
        });

        res.status(200).json({ message: "logs fetched", logs });
    } catch (error) {
        console.error("Error in getlogs:", error);
        res.status(500).json({ message: "server error" });
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
        // const { id, img } = req.body;
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "User id is required" });
        }
        // if (!img) {
        //     return res.status(400).json({ message: "Image is required" });
        // }

        // Find user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        // let matches = img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        // if (!matches || matches.length !== 3) {
        //     return res.status(400).json({ message: "Invalid image format" });
        // }

        let contentType =req.file.mimetype;
        // let imageBuffer = Buffer.from(matches[2], 'base64');

        let imageUrl = null
        console.log("file => " , req.file)

        if (req.file) {
            const uploadResult = await uploadTheImage(req.file.path);
            imageUrl = uploadResult?.secure_url;
            fs.unlinkSync(req.file.path);
        }

        user.profileimg = {
            data: imageUrl,
            contentType: contentType
        };
        console.log("image => " , imageUrl)

        await user.save();

        res.status(200).json({ message: "Profile image uploaded successfully" , image : imageUrl});
    } catch (error) {
        console.error("Error uploading profile image:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getimage = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.profileimg || !user.profileimg.data)
      return res.status(404).json({ message: "No image found" });

    // Cloudinary URL return
    res.status(200).json({
      message: "Image fetched",
      imageUrl: user.profileimg.data,
    });
    
  } catch (error) {
    console.error("Error in getimage", error);
    res.status(500).json({ message: "Server error" });
  }
};


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
                task: projectInfo?.task,
            }

            return {
                name: user.name,
                img: user.profileimg,
                projectinfo: projectdetail,
                userid: user._id
            };
        });

        res.status(200).json({ members: membersobj });

    } catch (error) {
        res.status(500).json({ message: "Server Error in Fetch All Members" + error });
    }
}