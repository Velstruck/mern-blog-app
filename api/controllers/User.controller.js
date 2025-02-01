import { json } from 'express';
import { handleError } from '../helpers/handleError.js';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
export const getUser = async (req, res, next) => {
    try {
        const { userid } = req.params
        const user = await User.findOne({ _id: userid }).lean().exec()
        if (!user) {
            next(handleError(404, 'User not found.'))
        }
        res.status(200).json({
            success: true,
            message: 'User data found.',
            user
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data)
        const { userid } = req.params

        const user = await User.findById(userid)
        user.name = data.name
        user.email = data.email
        user.bio = data.bio
        if(data.password && data.password.length > 8){
            const hashedPassword = bcryptjs.hashSync(data.password)
            user.password = hashedPassword
        }
        res.status(200).json({
            success: true,
            message: 'Data updated.',
            user
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}