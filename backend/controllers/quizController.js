import Quiz from "../models/quizModel.js";
import mongoose from "mongoose";

const createQuiz = async (req, res) => {
  try {
    console.log("Received: ", req.body);
    const { quizName, questionArray, answerArray, quizType, quizLength } = req.body;
    console.log("received quiz name -> ", quizName);
    console.log("received questions -> ", questions);
    console.log("received quiz type -> ", quizType);

    let jsonArray = [];
    questionArray.forEach((element, index) =>
      jsonArray.push({ question: element, answer: answerArray[index] })
    );
    const existingQuizName = await Quiz.find({ quizName: quizName });
    if (existingQuizName.length > 0) {
      console.log("Quiz with this name already exists");
      res.status(201).send();
    }

    const newQuiz = await Quiz.create({
      quizName: quizName,
      quizType: quizType,
      quizLength: quizLength,
      questions: jsonArray,
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
    console.log("Received: ", req.body);
    const { quizID } = req.body;
    console.log("Received quizID -> ", quizID);
    const quiz = await Quiz.findById(quizID);

    console.log("Quiz Received -> ", quiz);

    return res.status(200).json(quiz);
  } catch (err) {
    return res.status(400).send();
  }
};

const findAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});

    console.log("Quizzes returned -> ", quizzes);

    return res.status(200).json(quizzes);
  } catch (err) {
    return res.status(400).send();
  }
};

export { createQuiz, findQuiz, findAllQuizzes };