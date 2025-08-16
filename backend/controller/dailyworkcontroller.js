import dailywork from "../model/dailyworkschema.js";


export const adddailywork = async (req, res) => {
    const { id, work, time, date, project } = req.body;
    // console.log(req.body)

    const works = await dailywork.findOne({ id: id });

    if (!works) {
        const newworkid = new dailywork({
            id: id,
            work: [
                {
                    date: date,
                    time: time,
                    work: work,
                    project: project
                }
            ]
        })
        await newworkid.save();
        res.status(200).json({ message: "Work added successfully" });
    }

    else {
        works.work.unshift({
            date: date,
            time: time,
            work: work,
            project: project
        })
        await works.save();
        res.status(200).json({ message: "Work added successfully" });
    }
}


export const getdailywork = async (req, res) => {
    const { id } = req.body;

    const works = await dailywork.findOne({ id: id });

    if (!works) {
        res.status(404).json({ message: "user not found" })
    }

    else {
        res.status(200).json({ works: works.work });
    }
}

// export const deletework = async (req, res) => {
//     try {

//         const { users } = req.body

//         if (!users.workid || !users.userid) res.status(400).json({ message: "Work or userid id Not Found" });

//         // const workDoc = await dailywork.findOne({ id: users.userid });

//         // if (workDoc) {
//         //     const del = workDoc.work.find(w => w._id.toString() === users.workid);
//         //     console.log(del);
//         // }

//         await dailywork.updateOne(
//             { id: users.userid },
//             { $pull: { work: { _id: users.workid } } }
//         );

//         await dailywork.save()

//         res.status(200).json({ message: "work deleteed" })

//     } catch (error) {
//         res.status(500).json({ message: "Server Error" })
//     }
// }

export const deletework = async (req, res) => {
    try {
        const { users } = req.body;

        if (!users?.workid || !users?.userid) {
            return res.status(400).json({ message: "Work ID or User ID Not Found" });
        }

        const result = await dailywork.updateOne(
            { id: users.userid },
            { $pull: { work: { _id: users.workid } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Work not found" });
        }

        res.status(200).json({ message: "Work deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
