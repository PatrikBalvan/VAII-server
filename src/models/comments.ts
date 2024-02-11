import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    articleId: { type: String, required: true },
    userId: { type: String, required: true },
    body: { type: String, required: true}
})

export const commentModel =  mongoose.model('like', commentSchema)

export const getArticleComments = (articleId: string) => commentModel.find({articleId})
export const getCommentById = (_id: string) => commentModel.findById(_id)