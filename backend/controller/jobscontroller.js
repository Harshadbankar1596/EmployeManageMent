import Job from "../model/jobs.js"
import fs from "fs"
import uploadTheImage from "../utils/cloudinary.js"

export const uploadjob = async (req, res) => {
  try {
    // console.log(req.body);

    const { name , email , phone , role } = req.body;

    if (!name || !email || !phone || !role) return res.status(400).json({ message: "Data Not Found" });

    // if (!data.resume) {
    //   return res.status(400).json({ message: "Resume Missing" });
    // }

    // const buffer = Buffer.from(data.resume.data, "base64")
    // const contentType = data.resume.contentType;
    let contentType = req.file.mimetype;
    let imageUrl = null

    if (req.file) {
      const uploadResult = await uploadTheImage(req.file.path);
      imageUrl = uploadResult?.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const job = new Job({
      name,
      email,
      phone,
      resume: { data: imageUrl, contentType },
      role,
    });

    await job.save();

    res.status(200).json({ message: "Resume Saved Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getjobs = async (req, res) => {
  try {

    const job = await Job.find()

    if (!job) res.status(400).json({ message: "Job not foud" });

    res.status(200).json({ job })

  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}


export const deletejobs = async (req, res) => {
  try {

    // console.log(req.body)

    const { jobid } = req.body

    if (!jobid) res.status(400).json({ message: "JobId Not Found" });

    const job = await Job.findByIdAndDelete(jobid)

    res.status(200).json({ message: "Delete jobs Done" })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server Error" })
  }
}