import mongoose from 'mongoose';
import validator from 'validator';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        lowercase: true,
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
            if(!value.endsWith('.com') && !value.endsWith('.net')) {
                throw new Error('Email must end with .com or .net')
            }
        }
    },
    isadmin: {
        type: String,
        default: "employee"
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        unique : true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isMobilePhone(value, ['en-US', 'en-GB', 'es-ES'])) {
                throw new Error('Invalid phone number')
            }
            if (value.length !== 10) {
                throw new Error('number must be 10 digits')
            }
            if (!validator.isNumeric(value)) {
                throw new Error('Phone number must contain only numbers')
            }
            if (!validator.isLength(value, { min: 10, max: 10 })) {
                throw new Error('Phone number must be 10 digits')
            }
        },
        maxlength: 10
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