import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Quiz = () => {
  const param = useParams();
  const quizId = param.id;
  const [quizQuestions, setQuizQuestions] = useState();
  const [loading, setLoading] = useState(true);

  console.log("quizid=>", quizId);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/quizzes/quiz/${quizId}`
        );
        console.log(res);
        setQuizQuestions(res.data.questions);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  // this is super not efficient in terms of lines of code
  // but it works!!!!! 
  const shuffleOptions = (item) => {
    const number = Math.floor(Math.random() * 6) + 1;
    if (number === 1) {
        return (
          <div>
            <p> 1. {item.answer} </p>
            <p> 2. {item.option2} </p>
            <p> 3. {item.option3} </p>
          </div>
        );
    } else if (number === 2) {
        return ( 
            <div>
            <p> 1. {item.option2} </p>
            <p> 2. {item.answer} </p>
            <p> 3. {item.option3} </p>
          </div>
        )
    } else if (number === 3) {
        return ( 
            <div>
            <p> 1. {item.option2} </p>
            <p> 2. {item.option3} </p>
            <p> 3. {item.answer} </p>
          </div>
        )
    } else if (number === 4) {
        return ( 
            <div>
            <p> 1. {item.option3} </p>
            <p> 2. {item.option2} </p>
            <p> 3. {item.answer} </p>
          </div>
        )
    } else if (number === 5) {
        return ( 
            <div>
            <p> 1. {item.answer} </p>
            <p> 2. {item.option3} </p>
            <p> 3. {item.option2} </p>
          </div>
        )
    } else if (number === 6) {
        return ( 
            <div>
            <p> 1. {item.option3} </p>
            <p> 2. {item.answer} </p>
            <p> 3. {item.option2} </p>
          </div>
        )
    }
  };

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
            <h1> {shuffleOptions(item)} </h1>
          </div>
        ))}
      </div>
    );
  }
};

export default Quiz;
