import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    articleId: { type: String, required: true },
    userId: { type: String, required: true },
    body: { type: String, required: true}
}, {
    timestamps: true
})

export const commentModel =  mongoose.model('comment', commentSchema)

export const getArticleComments = (articleId: string) => commentModel.find({articleId})
export const getCommentById = (_id: string) => commentModel.findById(_id)
export const createComment = (com: Record<string, any>) => new commentModel(com).save().then((com) => com.toObject())
export const deleteCommentWithId = (_id: string) => commentModel.findByIdAndDelete(_id)