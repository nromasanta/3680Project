import Quiz from "../models/quizModel.js";
import mongoose from "mongoose";

const createQuiz = async (req, res) => {
  try {
    console.log("Received: ", req.body);
    const { author, quizName, quizLength, questions, quizType } = req.body;
    console.log("author -> ", author);
    console.log("Name -> ", quizName);
    console.log("Length -> ", quizLength);
    console.log("Questions -> ", questions);
    console.log("Type -> ", quizType);


    const existingQuizName = await Quiz.find({ quizName: quizName });
    if (existingQuizName.length > 0) {
      console.log("Quiz with this name already exists");
      res.status(201).send();
    }

    const newQuiz = await Quiz.create({
      author: author,
      quizName: quizName,
      quizType: quizType,
      quizLength: quizLength,
      questions: questions
    });
    console.log("New Quiz Created -->", newQuiz);

    return res.status(200).send();

  } catch (err) {
    console
    return res.status(400).send();
  }
};

const findQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received quizID -> ", id);
    const quiz = await Quiz.findById(id);

    console.log("Quiz Received -> ", quiz);

    return res.status(200).json(quiz);
  } catch (err) {
    return res.status(400).send();
  }
};

const findAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}).populate("author");
    console.log("Quizzes returned -> ", quizzes);
    return res.status(200).json(quizzes);
  } catch (err) {
    console.log("err->", err);
    return res.status(400);
  }
};

const publishScore = async (req, res) => {
  const { id } = req.params;
  const { user, score } = req.body;
  const jsonBody = {
    user: user,
    score: score,
  };
  try {
    const quiz = await Quiz.findById(id);
    console.log(quiz);
    quiz.leaderboard.push(jsonBody);
    await quiz.save();
    let publishedCount = quiz.leaderboard.length;
    let total = 0;
    if (publishedCount > 0) {
      for(let i = 0; i < publishedCount; i++) {
        total = total + quiz.leaderboard[i].score;
      }
      let average = (total / publishedCount);
      quiz.quizAvg = average;
      // console.log("total ->", total);
      // console.log("PC ->", publishedCount);
      // console.log("avg ->", average);
    } else {
      let average = quiz.leaderboard[0].score;
      quiz.quizAvg = average;
    }
    await quiz.save();
    return res.status(200).json(quiz);
    
  } catch (err) {
    console.log("Err-> ", err);
    return res.status(400);
  }
};

const getLeaderboard = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById({_id: id}).populate("leaderboard.user").sort({score: 1});
    // console.log("Found: ", quiz);
    console.log("Leaderboard: ", quiz.leaderboard);
    return res.status(200).json(quiz.leaderboard);
  } catch (err) {
    console.log("Err -> ", err);
    return res.status(400);
  }
};

const updateViewcount = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id);
    quiz.viewCount = quiz.viewCount + 1;
    quiz.save();
    return res.status(200).json(quiz.leaderboard);
  } catch (err) {
    console.log("Err -> ", err);
    return res.status(400);
  }

};

export { createQuiz, findQuiz, findAllQuizzes, publishScore, getLeaderboard, updateViewcount};