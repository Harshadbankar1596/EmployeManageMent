import Job from "../model/jobs.js"

// export const uploadjob = async (req , res)=>{
//     try {

//         console.log(req.body)

//         const {data} = req.body

//         if(!data) res.status(400).json({message : "Data Not Found"});

//         let matches = data.resume.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

//         if (!matches || matches.length !== 3) {
//             return res.status(400).json({ message: "Invalid image format" });
//         }

//         let contentType = matches[1];
//         let imageBuffer = Buffer.from(matches[2], 'base64');

//         const job = new Job({
//             name : data.name,
//             email : data.email,
//             phone : data.phone,
//             resume : {data : data.resume.data , contentType : data.resume.contentType},
//             role : data.role
//         })

//         await job.save()

//         res.status(200).json({message : "Resume Saved"})
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message : "Server Error"})
//     }
// }

export const uploadjob = async (req, res) => {
  try {
    console.log(req.body);

    const { data } = req.body;

    if (!data) return res.status(400).json({ message: "Data Not Found" });

    // resume object से buffer बनाना
    if (!data.resume || !data.resume.data || !data.resume.contentType) {
      return res.status(400).json({ message: "Resume Missing" });
    }

    const buffer = Buffer.from(data.resume.data, "base64"); // base64 → Buffer
    const contentType = data.resume.contentType;

    const job = new Job({
      name: data.name,
      email: data.email,
      phone: data.phone,
      resume: { data: buffer, contentType },
      role: data.role,
    });

    await job.save();

    res.status(200).json({ message: "Resume Saved Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getjobs = async (req , res) => {
    try {

        const job = await Job.find()

        if(!job) res.status(400).json({message : "Job not foud"});

        res.status(200).json({job})
        
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
}