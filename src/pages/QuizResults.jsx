import React, { Component } from 'react';
import { useState, useCallback, useEffect } from 'react';
import Hero from '../components/Hero/Hero.jsx'
import Featured from '../components/Featured/Featured.jsx'
import { useLocation } from 'react-router-dom';
import { useAuth } from '../auth/authProvider.jsx';

function QuizResults() {
    const location = useLocation();
    const { userId } = useAuth();
    const answerArray = location.state.answerArray;
    const selectedArray= location.state.selectedArray;
    const quizLength = location.state.quizLength;
    const quiz = location.state.quizFullJson;
    const quizQuestions = location.state.quizFullJson.questions;
    const [percentage, setPercentage] = useState();

    // const renameField (obj, old, new) {
            
    // };

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
      let percentCorrect = ((correctAnswerCounter / quizLength) * 100).toFixed(1);
      setPercentage(percentCorrect);
    }, []);


    return (
      <div>
        <h1>Percent correct: {percentage} </h1>
        <h1>Quiz Name: {quiz.quizName} </h1>
        {quizQuestions.map((item, index) => (
          <div key={index} className="m-6">
            <h1> {item.quizName} </h1>
            <h1> Question: {item.question} </h1>
            <h2> Correct Answer: {item.answer} </h2>
            <h2> You Answered: {selectedArray[index]} </h2>
          </div>
        ))}
      </div>
    );
}

export default QuizResults;