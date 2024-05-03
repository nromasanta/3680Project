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
    questions: [
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
    },
    quizTags: [
        {
            type: String,
            default:null,
        }
    ]
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);