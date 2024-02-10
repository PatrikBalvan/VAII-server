import express from 'express'
import bcrypt from 'bcrypt'
import z from 'zod'
import jwt from 'jsonwebtoken'
import { createUser, getUserByEmail } from '../models/users'

const createToken = (_id: string) => {
    return jwt.sign({_id}, process.env.SECRET)
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, username, password } = req.body

        if(!email || !username || !password) {
            throw new Error('Missing required fields')
        }

        const existingUser = await getUserByEmail(email)

        if(existingUser) {
            throw new Error('User with such email exists already')
        }

        const userSchema = z.object({
            email: z.string().email(),
            username: z.string().min(5),
            password: z.string().min(8)
        })

        const result = userSchema.safeParse({email, username, password})
        if(!result.success) {
            throw new Error('Fields dont match criteria')
        }

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        const user = await createUser({
            email,
            username,
            password: hash
        })


        const token = createToken(user._id.toString())

        return res.status(200).json({email, username, _id: user._id.toString(), token})
    } catch(error) {
        return res.status(400).json({message: error.message})
    }
}

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            throw new Error('Missing required fields')
        }

        const user = await getUserByEmail(email)

        if(!user) {
            throw new Error('User with such email does not exist')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch) {
            throw new Error('Password does not match')
        }

        const token = createToken(user._id.toString())

        return res.status(200).json({email, username: user.username, _id: user._id.toString(), token})
    } catch(error) {
        return res.status(400).json({message: error.message})
    }
}