import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String}
})

export const userModel =  mongoose.model('user', userSchema)

export const getUsers = () => userModel.find()
export const getUsersWithRole = (role: string) => userModel.find({ role: role })
export const getUserByEmail = (email: string) => userModel.findOne({ email })
export const getUserByUsername = (username: string) => userModel.findOne({ username })
export const getUserById = (id: string) => userModel.findById(id)
export const createUser = (usr: Record<string, any>) => new userModel(usr).save().then((user) => user.toObject())
export const deleteUserById = (id: string) => userModel.findByIdAndDelete(id)
export const updateUserById = (id: string, usr: Record<string, any>) => userModel.findByIdAndUpdate(id, usr)