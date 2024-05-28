import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    phoneNumber: { 
        type: String,
        required: true 
    },
    email: {
         type: String,
         equired: true, 
         unique: true 
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String,
        enum: ["user", "admin"], 
        default: 'user'
    },
    telegramChatId: {
        type: Number,
    }
});

const User = mongoose.model('users', userSchema);

export default User;