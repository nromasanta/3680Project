import mongoose from 'mongoose';
const { Schema } = mongoose;

// schema can be changed
const commentSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    comment: {
        type: String
    },
    rating: {
        type: Number 
    },
    likes: {
        type: Number,
        default: 0,
    },

}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
