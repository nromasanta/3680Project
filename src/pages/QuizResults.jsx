import React, { Component } from "react";
import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/authProvider.jsx";
import axios from "axios";
import QuizLeaderboard from "../components/Quiz/QuizLeaderboard.jsx";

function QuizResults() {
  const location = useLocation();
  const { userId } = useAuth();
  const answerArray = location.state.answerArray;
  const selectedArray = location.state.selectedArray;
  const quizLength = location.state.quizLength;
  const quiz = location.state.quizFullJson;
  const quizQuestions = location.state.quizFullJson.questions;
  const [percentage, setPercentage] = useState();
  const [quizId, setQuizId] = useState(location.state.quizFullJson._id);

  useEffect(() => {
    console.log("AA => ", answerArray);
    console.log("SA => ", selectedArray);
    console.log("QuizLength => ", quizLength);
    console.log("quiz => ", quiz);
    let correctAnswerCounter = 0;
    for (let i = 0; i < quizLength; i++) {
      if (answerArray[i] === selectedArray[i]) {
        correctAnswerCounter++;
      }
    }
    let percentCorrect = ((correctAnswerCounter / quizLength) * 100).toFixed(2);
    setPercentage(percentCorrect);
  }, []);

  const publishScore = async (e) => {
    const jsonBody = {
      user: userId,
      score: percentage,
    };
    console.log("Sending ----> ", jsonBody);

    try {
      const res = await axios.post(
        `http://localhost:4000/api/quizzes/publishScore/${quiz._id}`,
        jsonBody
      );
      console.log(res);
    } catch (err) {
      console.log("Error posting score: ", err);
    }
  };

  const publishComment = async () => {
    let userComment = document.getElementById("comment").value;

    const comment = {
      userID: userId,
      quizID: quizId,
      comment: userComment,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/api/comments`,
        comment
      );
      console.log(res);
    } catch (err) {
      console.log("Error publishing comment: ", err);
    }
  };
  return (
    <div>
      <h1>Percent correct: {percentage}% </h1>
      <h1>Quiz Name: {quiz.quizName} </h1>
      {quizQuestions.map((item, index) => (
        <div key={index} className="m-6">
          <h1> {item.quizName} </h1>
          <h1> Question: {item.question} </h1>
          <h2> Correct Answer: {item.answer} </h2>
          <h2> You Answered: {selectedArray[index]} </h2>
          <button onClick={(e) => publishScore(e)}>Publish Score</button>
        </div>
      ))}

      <h1> Leaderboard: </h1>
      <QuizLeaderboard quizId={quizId} />

      <div>
        <h1>Leave a comment:</h1>
        <textarea id="comment"></textarea>
        <button onClick={() => publishComment()}>Join the Conversation</button>
      </div>

      <div>
        <h1>Comments:</h1>
      </div>
    </div>
  );
}

export default QuizResults;
