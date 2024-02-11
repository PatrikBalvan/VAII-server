import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    articleId: { type: String, required: true },
    userId: { type: String, required: true }
})

export const likeModel =  mongoose.model('like', likeSchema)

export const getExistingLike = (articleId: string, userId: string) => likeModel.find({ articleId, userId })
export const getLikeById = (_id: string) => likeModel.findById(_id)
export const getUsersLikes = (userId: string) => likeModel.find({ userId })
export const getArticlesLikes = (articleId: string) => likeModel.find({ articleId })
export const createLike = (like: Record<string, any>) => new likeModel(like).save().then((like_) => like_.toObject())
export const deleteLike = (_id: string) => likeModel.findByIdAndDelete(_id)