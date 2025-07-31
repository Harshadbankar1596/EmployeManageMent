import dailywork from "../model/dailyworkschema.js";


export const adddailywork = async (req, res) => {
    const { id, work, time, date } = req.body;

    const works = await dailywork.findOne({ id: id });

    if (!works) {
        const newworkid = new dailywork({
            id : id,
            work : [
                {
                    date : date,
                    time : time,
                    work : work
                }
            ]
        })
        await newworkid.save();
        res.status(200).json({message : "Work added successfully"});
    }

    else{
        works.work.unshift({
            date : date,
            time : time,
            work : work
        })
        await works.save();
        res.status(200).json({message : "Work added successfully"});
    }
}


export const getdailywork = async (req, res) => {
    const {id} = req.body;

    const works = await dailywork.findOne({id : id});

    if(!works){
        res.status(404).json({message : "user not found"})
    }

    else {
        res.status(200).json({works : works.work});
    }
}