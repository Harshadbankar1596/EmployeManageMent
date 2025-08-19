import Job from "../model/jobs.js"

export const uploadjob = async (req , res)=>{
    try {

        const {data} = req.body

        if(!data) res.status(400).json({message : "Data Not Found"});

        let matches = data.img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

        if (!matches || matches.length !== 3) {
            return res.status(400).json({ message: "Invalid image format" });
        }

        let contentType = matches[1];
        let imageBuffer = Buffer.from(matches[2], 'base64');

        const job = new Job({
            name : data.name,
            email : data.email,
            phone : data.phone,
            resume : {data : imageBuffer , contentType , contentType},
            role : data.role
        })

        await job.save()

        res.status(200).json({message : "Resume Saved"})
        
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
}


export const getjobs = async (req , res) => {
    try {

        const job = await Job.find()

        if(!job) res.status(400).json({message : "Job not foud"});

        res.status(200).json({job})
        
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
}