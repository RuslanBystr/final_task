import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import TelegramBot from "node-telegram-bot-api";
import dotenv from 'dotenv';


const bot = new TelegramBot("6889993827:AAEURSB2ixQ-ST1yGwlQuMxVVTfRZwHFs2k", {polling: true});


const userService = {
    createUser: async (name, email, phoneNumber, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, phoneNumber, email, password: hashedPassword });
        await user.save();
        return user;
    },

    getUser: async (email) => {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
    },

    notifyAdminsInTelegram: async (name) => {
        const notifyClient = await User.findOne({telegramChatId: {$exists: true} }); //Only admins have a field: telegramChatId
        bot.sendMessage(notifyClient.telegramChatId, `Created new user: ${name}`); 
    }
}
    
export default userService;