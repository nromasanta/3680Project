import mongoose from 'mongoose';
const { Schema } = mongoose;

const quizSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizName: {
        type: String,
        required: true
    },
    quizLength: {
        type: Number,
        required: true
    },
    questions: [
        {
            question: {
                type: String,
                default: null
            },
            answer: {
                type: String,
                default: null
            },
            option2: {
                type: String,
                default: null
            },
            option3: {
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