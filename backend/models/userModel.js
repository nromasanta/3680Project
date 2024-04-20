import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;
// schema = structure of document
// schema can be changed
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps : true});

// any time a document is gonna be saved, this runs 
// middleware !!!
userSchema.pre('save', function(next) {
    let user = this;

    // did the user change the password? if not go next 
    if (!this.isModified("password")) {
        return next();
    }

    // execution drops down to here, meaning the password field was modified
    // gensalt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the passsword
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next (err);
            user.password = hash;
         next();
        });
    });
});


export default mongoose.model('User', userSchema);