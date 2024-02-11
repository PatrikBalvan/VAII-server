import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    authorId: { type: String, required: true }
})

export const articleModel =  mongoose.model('article', articleSchema)

export const getArticles = () => articleModel.find()
export const getArticleById = (id: string) => articleModel.findById(id)
export const createArticle = (article: Record<string, any>) => new articleModel(article).save().then((art) => art.toObject())
export const getUsersArticles = (authorId: string) => articleModel.find({ authorId }) 






// export const getUserByEmail = (email: string) => userModel.findOne({ email })
// export const getUserBySession = (session: string) => userModel.findOne({ 'authentication.session': session })
// export const getUserById = (id: string) => userModel.findById(id)
// export const createUser = (usr: Record<string, any>) => new userModel(usr).save().then((user) => user.toObject())
// export const deleteUserById = (id: string) => userModel.findByIdAndDelete(id)
// export const updateUserById = (id: string, usr: Record<string, any>) => userModel.findByIdAndUpdate(id, usr)