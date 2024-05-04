import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/authProvider";
import ListQuizQuestions from "../components/Quiz/ListQuizQuestions";
import "../styles/Quiz.css";

const Quiz = () => {
  const { userId } = useAuth();
  const { id: quizId } = useParams();
  const navigate = useNavigate();

  const [quizFullJson, setQuizFullJson] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answerArray, setAnswerArray] = useState([]);
  const [quizLength, setQuizLength] = useState(0);
  const [selectedArray, setSelectedArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateRandomNumber = (iterations) => {
    return Array.from({ length: iterations }, () =>
      Math.floor(Math.random() * 6) + 1
    );
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/quizzes/quiz/${quizId}`);
        const { quizLength, questions } = res.data;
        questions.forEach((item) => (item.number = generateRandomNumber(quizLength)));
        const answers = questions.map((item) => item.answer);

        setQuizFullJson(res.data);
        setQuizLength(quizLength);
        setAnswerArray(answers);
        setQuizQuestions(questions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    };

    const updateViewCount = async () => {
      try {
        await axios.post(`http://localhost:4000/api/quizzes/viewcount/${quizId}`);
      } catch (err) {
        console.error("Error updating view count:", err);
      }
    };

    fetchQuiz();
    updateViewCount();

  }, [quizId]);

  const handleAnswer = (e, index, num) => {
    const tempArr = [...selectedArray];
    tempArr[index] = e.target.value;

    for (let i = 1; i <= 3; i++) {
      const temp = document.getElementById(`item${i}${index}`);
      temp.classList.remove("quiz-selected");
      temp.classList.add("quiz-not-selected");
    }

    const el = document.getElementById(`item${num}${index}`);
    el.classList.add("quiz-selected");

    setSelectedArray(tempArr);
  };

  
  // uncomment for debugging
  // useEffect(() => {
  //   if (selectedArray) {
  //     console.log("SA -> ", selectedArray);
  //   }
  // }, [selectedArray]);

  const handleSubmitQuiz = () => {
    navigate(`/quiz/result/${quizId}`, {
      state: {
        answerArray: answerArray,
        selectedArray: selectedArray,
        quizLength: quizLength,
        quizFullJson: quizFullJson
      }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="quiz-page content set-container">
        <div className="quiz-page-container">
        <p>{quizFullJson.quizName}</p>
          {quizQuestions.map((item, index) => (            
            <div key={index} className="quiz-question">
              <p>Question: {item.question}</p>
              <ListQuizQuestions
                item={item}
                handleAnswer={handleAnswer}
                index={index}
              />
            </div>
          ))}
          <button onClick={handleSubmitQuiz}>Go To Results</button>
        </div>
      </div>
    );
  }
};

export default Quiz;
