import { handleError } from '../helpers/handleError.js';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const checkuser = await User.findOne({ email });
        if (checkuser) {
            //User already exists
            next(handleError(400, 'User already exists'));
        }
        // Create a new user
        const hashedPassword = bcryptjs.hashSync(password);
        const user = new User({
            name, email, password: hashedPassword

        });

        await user.save();

        res.status(200).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            next(handleError(404, 'Invalid credentials'));
        }
        const hashedPassword = user.password;
        const comparePassword = bcryptjs.compareSync(password, hashedPassword);
        if (!comparePassword) {
            next(handleError(404, 'Invalid credentials'));
        }
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        },process.env.JWT_SECRET);

        // Send token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
            path: '/'
        });

        const newUser= user.toObject({getters: true});
        delete newUser.password;

        res.status(200).json({
            success: true,
            user: newUser,
            message: 'User logged in successfully',
        });

    } catch (error) {
        next(handleError(500, error.message));
    }

 }

 export const GoogleLogin = async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body;
        let user 
        user = await User.findOne({ email });
        if (!user) {
            //create new user
            const password=Math.random().toString();
            const hashedPassword = bcryptjs.hashSync(password);
            const newUser  = new User({
                name, email, avatar, password: hashedPassword
            });

            user = await newUser.save();
        }
        
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        },process.env.JWT_SECRET);

        // Send token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
            path: '/'
        });

        const newUser= user.toObject({getters: true});
        delete newUser.password;

        res.status(200).json({
            success: true,
            user: newUser,
            message: 'User logged in successfully',
        });

    } catch (error) {
        next(handleError(500, error.message));
    }

 }
 export const Logout = async (req, res, next) => {
    try {
        

        // Send token in cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
            path: '/'
        });

        res.status(200).json({
            success: true,
            message: 'Logout successfull',
        });

    } catch (error) {
        next(handleError(500, error.message));
    }

 }