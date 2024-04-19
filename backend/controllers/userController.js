import User from '../models/userModel.js';
import mongoose from 'mongoose';

// how to query documents :
// https://mongoosejs.com/docs/queries.html


// get all users - returns array of JSON objects
const getAllUsers = async (req, res) => {
    const users = await User.find({});
    console.log(users);

    res.status(200).json(users)
}

// get a single user
const getSingleUser = async (req, res) => {
    const {id} = req.params

    // check if we passed a valid mongoose ID
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }
    const user = await User.findById(id)
    if(!user) { 
        return res.status(404).json({error: 'User not found'})
    }

    res.status(200).json(user)
}

export { getAllUsers, getSingleUser };