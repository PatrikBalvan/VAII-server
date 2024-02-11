import express from 'express'
import { Request } from 'interfaces/declarations'
import { getUserByUsername, getUserByEmail, getUserById, getUsers } from 'models/users'
import z from 'zod'
import bcrypt from 'bcrypt'

export const updateUser = async (req: Request, res: express.Response) => {
    try {
        const user = await getUserById(req.user)
        const {email, username, password} = req.body

        const existingUserByEmail = await getUserByEmail(email)
        const existingUserByUsername = await getUserByUsername(username)

        if(existingUserByEmail && existingUserByEmail._id.toString() !== user._id.toString()) {
            throw new Error('Uživateľ s takym mailom už existuje!')
        }

        if(existingUserByUsername && existingUserByUsername._id.toString() !== user._id.toString()) {
            throw new Error('Uživateľ s takym menom už existuje!')
        }

        const userSchema = z.object({
            email: z.string().email(),
            username: z.string().min(5).max(10),
            password: z.string().min(8).max(15).optional().or(z.literal(''))
        })

        const result = userSchema.safeParse({email, username, password})
        if(!result.success) {
            throw new Error('Polia nesplňaju kriteria!')
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
        res.status(400).json({message: error.message})
    }
}

export const getUserInfo = async (req: Request, res: express.Response) => {
    try {
        const { id } = req.params
        const user = await getUserById(id)

        if(!user) {
            throw new Error('Uživateľ neexistuje')
        }

        return res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const makeUserEditor = async (req: Request, res: express.Response) => {
    try {
        const { id } = req.params
        const user = await getUserById(id)

        if(!user) {
            throw new Error('Uživateľ neexistuje')
        }

        user.role = 'Editor'
        await user.save()

        return res.sendStatus(200)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const removeUserEditor = async (req: Request, res: express.Response) => {
    try {
        const { id } = req.params
        const user = await getUserById(id)

        if(!user) {
            throw new Error('Uživateľ neexistuje')
        }

        user.role = ''
        await user.save()

        return res.sendStatus(200)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const makeUserAdmin = async (req: Request, res: express.Response) => {
    try {
        const { id } = req.params
        const user = await getUserById(id)

        if(!user) {
            throw new Error('Uživateľ neexistuje')
        }

        user.role = 'Admin'
        await user.save()

        return res.sendStatus(200)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const removeUserAdmin = async (req: Request, res: express.Response) => {
    try {
        const { id } = req.params
        const user = await getUserById(id)

        if(!user) {
            throw new Error('Uživateľ neexistuje')
        }

        user.role = ''
        await user.save()

        return res.sendStatus(200)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const continueFunc = async (req: Request, res: express.Response) => {
        return res.sendStatus(200)
}