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
    isadmin: {
        type: String,
        default: "employee"
    },
    // isadmin: {
    //     type: Boolean,
    //     default: false
    // },
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
        data: mongoose.Schema.Types.Buffer,
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
    ],
    workingOn: {
        type: [
            {
                projectid: String,
                title: { type: String, default: 'Project' },
                task: [
                    {
                        title: { type: String, default: 'Task' },
                        status: { type: Boolean, default: false },
                    }
                ],
                members: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }],
                status: { type: Boolean, default: false },
                startdate: { type: Date, default: Date.now },
                enddate: { type: Date, default: Date.now }

            }
        ]
    }
});

const User = mongoose.model('User', userSchema);

export default User;

