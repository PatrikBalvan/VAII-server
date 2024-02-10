import express from 'express'
import { Request } from 'interfaces/declarations'
import { deleteUserById, getUserByEmail, getUserById, getUsers } from 'models/users'
import z from 'zod'
import bcrypt from 'bcrypt'

export const updateUser = async (req: Request, res: express.Response) => {
    try {
        const user = await getUserById(req.user)
        const {email, username, password} = req.body

        const existingUser = await getUserByEmail(email)

        if(existingUser && existingUser._id.toString() !== user._id.toString()) {
            throw new Error('User with such email exists already')
        }

        if(username) {
            user.username = username
        }

        if(email) {
            user.email = email
        }

        if(password) {
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(password, salt)
            user.password = hash
        }

        await user.save()

        return res.status(200).json({username: user.username, email: user.email})
    } catch (error) {
        res.sendStatus(400)
    }
}

export const getUserInfo = async (req: Request, res: express.Response) => {
    try {
        const { id } = req.params
        const user = await getUserById(id)

        if(!user) {
            throw new Error('User doesnt exist')
        }

        return res.status(200).json(user)
    } catch (error) {
        res.sendStatus(400)
    }
}