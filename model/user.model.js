import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            }
        }
    },
    password: {
        type: String,
        required: false,
        minlength: 8,
        select: false
    },
    tasks:[
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                default: false
            },
            createdAt:{
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

export default User;
