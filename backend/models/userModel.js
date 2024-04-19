import mongoose from 'mongoose';
const { Schema } = mongoose;

// schema = structure of document
// schema can be changed
const userSchema = new Schema({
    username: {
        type: String,
        required:true
    },
}, {timestamps : true})

export default mongoose.model('User', userSchema);