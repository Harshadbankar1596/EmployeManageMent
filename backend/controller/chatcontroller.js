// import ChatSchema from "../model/chatschema.js";

// export const socketHandler = (io) => {
//   io.on("connection", (socket) => {
//     console.log("A user connected");

//     socket.on("send-message", async ({ message, name, groupname }) => {
//       try {
//         const existingGroup = await ChatSchema.findOne({ groupname });
        
//         if (existingGroup) {
//           // Add message to existing group
//           existingGroup.message.push({
//             username: name,
//             text: message,
//             time: new Date()
//           });
//           await existingGroup.save();
          
//           // Emit to all clients in the group
//           io.emit("receive-message", { message, name, groupname });
//         } else {
//           // Create new group (this should rarely happen as groups are created via API)
//           const newMessage = new ChatSchema({
//             groupname: groupname, 
//             message: [{
//               username: name,
//               text: message,
//               time: new Date()
//             }],
//             members: [] // Default empty members array
//           });
//           await newMessage.save();
//           io.emit("receive-message", { message, name, groupname });
//         }
//       } catch (error) {
//         console.error("Error handling message:", error);
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log("A user disconnected");
//     });
//   });
// };

// // export const getmessages = async (req, res) => {
// //   try {
// //     const { groupname } = req.body

// //     const messsage = await ChatSchema.findOne({ groupname })

// //     const group = await ChatSchema.find()
// //     // group.map((group)=>{
// //     //   console.log(group.groupname)
// //     // })

// //     if(group.length === 0){
// //       return res.status(200).json({ message: "No groups found" , groups : [] })
// //     }
   
// //     res.status(200).json({ message: messsage , groups : group.map((group)=>group.groupname) })

// //   } catch (error) {
// //     console.log("error in getmessages")
// //     res.status(500).json({ message: "Internal server error" })
// //   }
// // }

// // export const creategroup = async (req, res) => {
// //   try {
// //     const { groupname } = req.body;

// //     if (!groupname || typeof groupname !== "string" || !groupname.trim()) {
// //       return res.status(400).json({ message: "Invalid group name" });
// //     }

// //     const existingGroup = await ChatSchema.findOne({ groupname: groupname.trim() });
// //     if (existingGroup) {
// //       return res.status(409).json({ message: "Group already exists", groupname: groupname.trim() });
// //     }

// //     const newGroup = new ChatSchema({ groupname: groupname.trim(), message: [] });
// //     await newGroup.save();
// //     res.status(201).json({ message: "Group created successfully", groupname: groupname.trim() });
// //   } catch (error) {
// //     console.log("error in creategroup", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // }


// export const getmessages = async (req, res) => {
//   try {
//     const { groupname, userId } = req.body;

//     if (!groupname) {
//       return res.status(400).json({ message: "Group name is required" });
//     }

//     const group = await ChatSchema.findOne({ groupname });

//     if (!group) {
//       // Return empty messages for non-existent groups
//       return res.status(200).json({ 
//         message: { message: [] }, 
//         groups: await getUsersGroups(userId) 
//       });
//     }

//     console.log("group => " , group)
//     console.log("userid => " , userId)

//     // Check if user is member of group (only if group has members)
//     if (group.members && group.members.length > 0) {
//       const isMember = group.members.some(m => m === userId);
//       if (!isMember) {
//         return res.status(403).json({ message: "You are not a member of this group" });
//       }
//     }

//     // Get all groups where user is a member
//     const userGroups = await getUsersGroups(userId);

//     res.status(200).json({
//       message: group,
//       groups: userGroups
//     });

//   } catch (error) {
//     console.log("error in getmessages", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Helper function to get user's groups
// const getUsersGroups = async (userId) => {
//   if (!userId) {
//     // If no userId, return all groups (for backward compatibility)
//     const allGroups = await ChatSchema.find({});
//     return allGroups.map(g => g.groupname);
//   }
  
//   const userGroups = await ChatSchema.find({ 
//     $or: [
//       { "members.userId": userId },
//       { members: { $size: 0 } } // Include groups with no members (public groups)
//     ]
//   });
//   return userGroups.map(g => g.groupname);
// };

// export const creategroup = async (req, res) => {
//   try {
//     const { groupname, members } = req.body;

//     if (!groupname || typeof groupname !== "string" || !groupname.trim()) {
//       return res.status(400).json({ message: "Invalid group name" });
//     }

//     const existingGroup = await ChatSchema.findOne({ groupname: groupname.trim() });
//     if (existingGroup) {
//       return res.status(409).json({ message: "Group already exists" });
//     }

//     const newGroup = new ChatSchema({
//       groupname: groupname.trim(),
//       message: [],
//       members: Array.isArray(members) ? members.map(m => ({
//         userId: m.id,
//         Name: m.name
//       })) : []
//     });

//     await newGroup.save();
//     res.status(201).json({ message: "Group created successfully", group: newGroup });
//   } catch (error) {
//     console.log("error in creategroup", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


import ChatSchema from "../model/chatschema.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join-room", (groupname) => {
      socket.join(groupname);
      console.log(`User joined group: ${groupname}`);
    });

    socket.on("send-message", async ({ message, name, groupname, userId }) => {
      try {
        const existingGroup = await ChatSchema.findOne({ groupname });

        if (!existingGroup) {
          return; 
        }

        if (existingGroup.members?.length > 0) {
          const isMember = existingGroup.members.some(m => m.userId === userId);
          if (!isMember) {
            console.warn(`User ${userId} not a member of ${groupname}`);
            return;
          }
        }

        // Save message
        existingGroup.message.push({
          username: name,
          text: message,
          time: new Date(),
        });
        await existingGroup.save();

        io.to(groupname).emit("receive-message", { message, name, groupname });
      } catch (error) {
        console.error("Error handling message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}


const getUsersGroups = async (userId) => {
  if (!userId) {
    // If no userId, return all groups (for backward compatibility)
    const allGroups = await ChatSchema.find({});
    return allGroups.map(g => g.groupname);
  }
  
  const userGroups = await ChatSchema.find({ 
    $or: [
      { "members.userId": userId },
      { members: { $size: 0 } } // Include groups with no members (public groups)
    ]
  });
  return userGroups.map(g => g.groupname);
}

export const getmessages = async (req, res) => {
  try {
    const { groupname, userId } = req.body;

    if (!groupname) {
      return res.status(400).json({ message: "Group name is required" });
    }

    const group = await ChatSchema.findOne({ groupname });

    if (!group) {
      return res.status(200).json({ 
        message: { message: [] }, 
        groups: await getUsersGroups(userId) 
      });
    }

    console.log("group => ", group)
    console.log("userid => ", userId)

    // Check if user is member of group (only if group has members)
    if (group.members && group.members.length > 0) {
      // FIXED: Use m.userId instead of m
      const isMember = group.members.some(m => m.userId === userId);
      if (!isMember) {
        return res.status(403).json({ message: "You are not a member of this group" });
      }
    }

    // Get all groups where user is a member
    const userGroups = await getUsersGroups(userId);

    res.status(200).json({
      message: group,
      groups: userGroups
    });

  } catch (error) {
    console.log("error in getmessages", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const creategroup = async (req, res) => {
  try {
    const { groupname, members } = req.body;

    if (!groupname || typeof groupname !== "string" || !groupname.trim()) {
      return res.status(400).json({ message: "Invalid group name" });
    }

    const existingGroup = await ChatSchema.findOne({ groupname: groupname.trim() });
    if (existingGroup) {
      return res.status(409).json({ message: "Group already exists" });
    }

    const newGroup = new ChatSchema({
      groupname: groupname.trim(),
      message: [],
      members: Array.isArray(members) ? members.map(m => ({
        userId: m.id,
        Name: m.name
      })) : []
    });

    await newGroup.save();
    res.status(201).json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    console.log("error in creategroup", error);
    res.status(500).json({ message: "Internal server error" });
  }
}