import ChatSchema from "../model/chatschema.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("send-message", async ({ message, name, groupname }) => {


      const existingGroup = await ChatSchema.findOne({ groupname });
      
      if (existingGroup) {
        existingGroup.message.push({
          username: name,
          text: message,
          time: new Date()
        })
        await existingGroup.save();
        io.emit("receive-message", { message, name, groupname });
      }

      if (!existingGroup) {
        const newMessage = new ChatSchema({
          groupname: groupname, 
          message: [
            {
              username: name,
              text: message,
              time: new Date()
            },
          ],
        });
        await newMessage.save();
        io.emit("receive-message", { message, name, groupname });
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};


export const getmessages = async (req, res) => {
  try {
    const { groupname } = req.body

    const messsage = await ChatSchema.findOne({ groupname })

    const group = await ChatSchema.find()
    // group.map((group)=>{
    //   console.log(group.groupname)
    // })

    if(group.length === 0){
      return res.status(200).json({ message: "No groups found" , groups : [] })
    }
   
    res.status(200).json({ message: messsage , groups : group.map((group)=>group.groupname) })

  } catch (error) {
    console.log("error in getmessages")
    res.status(500).json({ message: "Internal server error" })
  }
}

export const creategroup = async (req, res) => {
  try {
    const { groupname } = req.body;

    if (!groupname || typeof groupname !== "string" || !groupname.trim()) {
      return res.status(400).json({ message: "Invalid group name" });
    }

    const existingGroup = await ChatSchema.findOne({ groupname: groupname.trim() });
    if (existingGroup) {
      return res.status(409).json({ message: "Group already exists", groupname: groupname.trim() });
    }

    const newGroup = new ChatSchema({ groupname: groupname.trim(), message: [] });
    await newGroup.save();
    res.status(201).json({ message: "Group created successfully", groupname: groupname.trim() });
  } catch (error) {
    console.log("error in creategroup", error);
    res.status(500).json({ message: "Internal server error" });
  }
}