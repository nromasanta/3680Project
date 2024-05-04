import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/authProvider";
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

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/quizzes/quiz/${quizId}`);
        const { quizLength, questions } = res.data;
        const answers = questions.map((item) => item.answer);

        setQuizFullJson(res.data);
        setQuizLength(quizLength);
        setAnswerArray(answers);
        setQuizQuestions(shuffleQuestions(questions)); // Shuffle questions
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

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffleQuestions = (questions) => {
    // Shuffle questions and their options
    return questions.map((question) => {
      const options = [question.answer, question.option2, question.option3];
      const shuffledOptions = shuffleArray(options);
      return { ...question, shuffledOptions };
    });
  };

  const handleAnswer = (e, index, num) => {
    const tempArr = [...selectedArray];
    tempArr[index] = e.target.value;

    // Remove selected class from all buttons
    for (let i = 1; i <= 3; i++) {
      const temp = document.getElementById(`item${i}${index}`);
      temp.classList.remove("quiz-selected");
      temp.classList.add("quiz-not-selected");
    }

    // Add selected class to the clicked button
    const el = document.getElementById(`item${num}${index}`);
    el.classList.add("quiz-selected");
    el.classList.remove("quiz-not-selected");

    setSelectedArray(tempArr);
  };

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
          <p className="quiz-title">{quizFullJson.quizName}</p>

          <hr />

          {quizQuestions.map((item, index) => (            
            <div key={index} className="quiz-each-question">
              <p className="quiz-question">
                <span className="font-bold">Question: </span>
                {item.question}
              </p>
              <div className="quiz-answer-list">
                {item.shuffledOptions.map((option, i) => (
                  <button 
                    className="quiz-answer" 
                    key={`item${i + 1}${index}`} 
                    id={`item${i + 1}${index}`} 
                    value={option} 
                    onClick={(e) => handleAnswer(e, index, i + 1)}
                  >
                    {`${option}`}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button 
          className="quiz-submit-button"
          onClick={handleSubmitQuiz}
          >
            Complete Quiz
          </button>
        </div>
      </div>
    );
  }
};

export default Quiz;
