import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userService from '../services/userService.js';


export const createUser = async (req, res) => {

    try {
        const { name, email, phoneNumber, password } = req.body;

        if (!name || !email || !phoneNumber || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        await userService.createUser(name, email, phoneNumber, password);

        return res.status(201).json({message: 'User created'});

    } catch (err) {
        console.log(err);
        return res.status(400).json({message: 'Error creating user'});
    }
    
}

export const getUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userService.getUser(email);

        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare( password, user.password );

        if (!isMatch) {
            return res.status(400).json({message: 'Invalid login or password'});
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({ token });

    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Error logging in'});
    }
}