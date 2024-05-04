import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/authProvider";
import axios from "axios";
import ListQuizQuestions from "../components/ListQuizQuestions";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const { userId } = useAuth();
  const param = useParams();
  const navigate = useNavigate();
  const quizId = param.id;

  const [quizQuestions, setQuizQuestions] = useState();
  const [answerArray, setAnswerArray] = useState([]);
  const [quizLength, setQuizLength] = useState();
  const [selectedArray, setSelectedArray] = useState([]);
  const [quizFullJson, setQuizFullJson] = useState();
  const [loading, setLoading] = useState(true);

  const generateRandomNumber = (iterations) => {
    let tempArr = [];
    for (let i = 0; i < iterations; i++) {
      let number = Math.floor(Math.random() * 6) + 1;
      // console.log("Number: ", number, "Iterations : ", iterations);
      tempArr.push(number);
    }
    return tempArr;
  };

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/quizzes/quiz/${quizId}`
        );
        console.log(res);
        let iterations = res.data.quizLength; // quiz length
        let resQuestions = res.data.questions; // questions
        resQuestions.forEach(
          // give each document a number array based on length
          (item) => (item.number = generateRandomNumber(iterations))
        );
        let answers = res.data.questions.map((item) => item.answer); // make an array of answers
        setQuizFullJson(res.data);
        setQuizLength(res.data.quizLength);
        setAnswerArray(answers); // set answer array
        setQuizQuestions(res.data.questions); // set questions array (CONTAINS ANSWERS + OPTIONS)
      } catch (err) {
        console.log(err);
      }
    };
    getQuiz();
  }, []);

  const handleSubmitQuiz = (e) => {
    navigate(`/quiz/result/${quizId}`, { state: { answerArray: answerArray, selectedArray: selectedArray, quizLength: quizLength, quizFullJson: quizFullJson } });
  };


  // change class names if you need to adjust appearance
  const handleAnswer = (e, index, num) => {
    let tempArr = [...selectedArray];
    tempArr[index] = e.target.value;
    let el = document.getElementById("item" + num + index);
    if (num === 1) {
      console.log("Clicked 1");
      let temp2 = document.getElementById("item2" + index);
      let temp3 = document.getElementById("item3" + index);
      temp2.classList.remove("text-red-500");
      temp3.classList.remove("text-red-500");
      temp2.classList.add("text-black");
      temp3.classList.add("text-black");
    } else if (num === 2) {
      console.log("Clicked 2");
      let temp1 = document.getElementById("item1" + index);
      let temp3 = document.getElementById("item3" + index);
      temp1.classList.remove("text-red-500");
      temp3.classList.remove("text-red-500");
      temp1.classList.add("text-black");
      temp3.classList.add("text-black");
    } else if (num === 3) {
      console.log("Clicked 3");
      let temp1 = document.getElementById("item1" + index);
      let temp2 = document.getElementById("item2" + index);
      temp1.classList.remove("text-red-500");
      temp2.classList.remove("text-red-500");
      temp1.classList.add("text-black");
      temp2.classList.add("text-black");
    }
    el.classList.add('text-red-500');
    setSelectedArray(tempArr);
  };

  // uncomment for debugging
  // useEffect(() => {
  //   if (selectedArray) {
  //     console.log("SA -> ", selectedArray);
  //   }
  // }, [selectedArray]);

  useEffect(() => {
    if (quizQuestions) {
      setLoading(false);
    }
  }, [quizQuestions]);

  if (loading) {
    <p>Loading...</p>;
  } else {
    return (
      <div className="temp-page">
        {quizQuestions.map((item, index) => (
          <div key={index} className="m-6">
            <h1> {item.quizName} </h1>
            <h1> Question: {item.question} </h1>
            <ListQuizQuestions
              item={item}
              handleAnswer={handleAnswer}
              index={index}
            />
          </div>
        ))}
        <button onClick = {(e) => {handleSubmitQuiz(e)}}>Go To Results</button>
      </div>
    );
  }
};

export default Quiz;
