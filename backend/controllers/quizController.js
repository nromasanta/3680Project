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
    return res.status(400).send();
  }
};

export { createQuiz, findQuiz, findAllQuizzes };