import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import TelegramBot from "node-telegram-bot-api";

import 'dotenv/config.js';


const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});

bot.on('polling_error', (err) => {
    console.log(`Polling error ${err.code} ${err.message}`);
})

const userService = {
    createUser: async (name, email, phoneNumber, password) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, phoneNumber, email, password: hashedPassword });
            await user.save();
            
            await userService.notifyAdminsInTelegram(name);

            return user;
        } catch (err) {
            throw new Error("User not created or duplicate user");
        }

    },

    getUser: async (email) => {
        try {
            const user = await User.findOne({ email });

            if (!user) throw new Error('User not found');

            return user;

        } catch (err) {
            throw new Error('Error retrieving user');
        }
    },

    notifyAdminsInTelegram: async (name) => {
        try {
            const admins = await User.find({telegramChatId: {$exists: true} });

            if (!admins.length) throw new Error("No admins found");

            for (const admin of admins) await bot.sendMessage(admin.telegramChatId, `Created new user: ${name}`);

        } catch (err) {
            console.error('Failed to notify admins in telegram');
        }
 
    }
}
    
export default userService;