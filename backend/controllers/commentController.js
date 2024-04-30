import Comment from "../models/commentModel.js";
import mongoose from "mongoose";

// how to query documents :
// https://mongoosejs.com/docs/queries.html

const createComment = async (req, res) => {
    try {
        console.log("Received: ", req.body);
        const { userID, quizID, comment, rating } = req.body;
        console.log("received userID -> ", userID);
        console.log("received quizID -> ", quizID);
        console.log("received comment -> ", comment);
        console.log("received rating -> ", rating);

        const newComment = new Comment({
            userID: userID,
            quizID: quizID,
            comment: comment,
            rating: rating,
        });

        await newComment.save();
        return res.status(200).send();
    } catch (err) {
        return res.status(400).send();
    }
};

const findQuizComments = async (req, res) => {
    try {
        console.log("req.body -> ", req.body);
        const { quizID } = req.body;

        const quizComments = await Comment.find({ quizID: quizID });
        console.log("Quiz Comments-> ", quizComments);
        if (!quizComments) {
            return res.status(201).send();
        }
        console.log("received -> ", req.body);
        console.log("got from db -> ", quizComments);

        return res.status(200).json(quizComments);
    } catch (err) {
        return res.status(400).send();
    }
};

// get all users - returns array of JSON objects
const findUserComments = async (req, res) => {
    console.log("req.body -> ", req.body);
    const { userID } = req.body;

    const userComments = await Comment.find({ userID: userID });
    console.log("Users Comments -> ", userComments);
    if (!userComments) {
        return res.status(201).send();
    }
    console.log("received -> ", req.body);
    console.log("got from db -> ", userComments);

    return res.status(200).json(userComments);
};

// get a single user
const getRandomComment = async (req, res) => {

    console.log("req.body -> ", req.body);
    const { quizID } = req.body;
    const randomComment = await Comment.aggregate(
        [
            { $match: { quizID: quizID } },
            { $sample: { size: 1 } }
        ]);
    console.log("Quiz Comment-> ", randomComment);

    if (!randomComment) {
        return res.status(201).send();
    }

    console.log("received -> ", req.body);
    console.log("got from db -> ", userComments);
    return res.status(200).json(randomComment);
};
export { createComment, findQuizComments, findUserComments, getRandomComment };
