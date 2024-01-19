import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        session: { type: String, select: false },
    }
})

export const userModel =  mongoose.model('user', userSchema)

export const getUsers = () => userModel.find()
export const getUserByEmail = (email: string) => userModel.findOne({ email })
export const getUserBySession = (session: string) => userModel.findOne({ 'authentication.session': session })
export const getUserById = (id: string) => userModel.findById(id)
export const createUser = (usr: Record<string, any>) => new userModel(usr).save().then((user) => user.toObject())
export const deleteUserById = (id: string) => userModel.findByIdAndDelete(id)
export const updateUserById = (id: string, usr: Record<string, any>) => userModel.findByIdAndUpdate(id, usr)