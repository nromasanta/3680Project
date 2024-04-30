import mongoose from 'mongoose';
const { Schema } = mongoose;

const quizSchema = new Schema({
    quizName: {
        type: String,
        required: true
    },
    quizLength: {
        type: Number,
        required: true
    },
    qustions: [
        {
            question: {
                type: String,
                default: null
            },
            answer: {
                type: String,
                default: null
            }
        }
    ],
    quizType: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);