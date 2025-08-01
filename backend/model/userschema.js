import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    isadmin : {
        type : Boolean,
        default : false
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'DevOps Engineer', 'Data Analyst', 'Cyber Security Engineer', 'Blockchain Developer', 'Flutter Developer', 'React Native Developer', 'Database Administrator', 'HR', 'Admin'],
        default: 'Full Stack Developer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profileimg: {
        data: Buffer,
        contentType: String,
    },
    
    logs: [
        {
            date: {
                type: String,
                required: true,
                default: new Date().toLocaleDateString()
            },
            punchs: {
                type: [String],
                default: []
            },
            status: {
                type: String,
                default: 'pending'
            }
        }
    ]
    ,
    summary: {
        totalDaysTracked: Number,
        presentDays: Number,
        leaveDays: Number,
        halfDays: Number,
        totalWorkingHours: Array,
        averageDailyHours: Number,
    },
    workingOn: {
        type: [
            {
                title: { type: String, default: 'Project' },
                task: [
                    {
                        title: { type: String, default: 'Task' },
                        status: { type: Boolean, default: false },
                    }
                ],
                status: { type: Boolean, default: false },
                startdate: { type: Date, default: new Date().toLocaleDateString() }
            }
        ],

        default: [{
            title: "Project 1",
            task: [{
                title: "Task1",
                status: false,
            }],
            status: false,
            startdate: new Date().toLocaleDateString()
        }]
    }
});

const User = mongoose.model('User', userSchema);

export default User;


