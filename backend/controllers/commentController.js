import Comment from "../models/commentModel.js";
import mongoose from "mongoose";

// how to query documents :
// https://mongoosejs.com/docs/queries.html

const createComment = async (req, res) => {
    try {
        console.log("Received: ", req.body);
        const { userID, quizID, comment} = req.body;
        console.log("received userId -> ", userID);
        console.log("received quizId -> ", quizID);
        console.log("received comment -> ", comment);
        console.log("Before Create");
        const newComment = await Comment.create({
            userID: userID,
            quizID: quizID,
            comment: comment,
        },
    console.log("inside Create"));
    console.log("After create");
        console.log("New Comment Created -> ", newComment)
        return res.status(200).send();
    } catch (err) {
        return res.status(400).send();
    }
};

const findQuizComments = async (req, res) => {
    try {
        console.log("req.body -> ", req.body);
        const { quizId } = req.body;

        const quizComments = await Comment.find({ quizId: quizId });
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
    const { userId } = req.body;

    const userComments = await Comment.find({ userId: userId });
    console.log("Users Comments -> ", userComments);
    if (!userComments) {
        return res.status(201).send();
    }
    console.log("received -> ", req.body);
    console.log("got from db -> ", userComments);

    return res.status(200).json(userComments);
};

// get a single user
const findRandomComment = async (req, res) => {

    console.log("req.body -> ", req.body);
    const { quizId } = req.body;
    const randomComment = await Comment.aggregate(
        [
            { $match: { quizId: quizId } },
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
export { createComment, findQuizComments, findUserComments, findRandomComment };
