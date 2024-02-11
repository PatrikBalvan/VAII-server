import express from 'express'
import bcrypt from 'bcrypt'
import z from 'zod'
import jwt from 'jsonwebtoken'
import { createUser, getUserByEmail, getUserByUsername } from '../models/users'

const createToken = (_id: string) => {
    return jwt.sign({_id}, process.env.SECRET)
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, username, password } = req.body

        if(!email || !username || !password) {
            throw new Error('Nevyplnené jedno z povinnych poli!')
        }

        const existingUserByEmail = await getUserByEmail(email)
        const existingUserByUsername = await getUserByUsername(username)

        if(existingUserByEmail) {
            throw new Error('Uživateľ s takym mailom už existuje!')
        }

        if(existingUserByUsername) {
            throw new Error('Uživateľ s takym menom už existuje!')
        }

        const userSchema = z.object({
            email: z.string().email(),
            username: z.string().min(5).max(10),
            password: z.string().min(8).max(15)
        })

        const result = userSchema.safeParse({email, username, password})
        if(!result.success) {
            throw new Error('Polia nesplňaju kriteria!')
        }

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        const user = await createUser({
            email,
            username,
            password: hash,
            role: ''
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
            throw new Error('Nevyplnené jedno z povinnych poli!')
        }

        const user = await getUserByEmail(email)

        if(!user) {
            throw new Error('Uživateľ s takym mailom neexistuje')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch) {
            throw new Error('Nezhoduje sa heslo!')
        }

        const token = createToken(user._id.toString())

        return res.status(200).json({email, username: user.username, _id: user._id.toString(), token})
    } catch(error) {
        return res.status(400).json({message: error.message})
    }
}