import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/authProvider";

const Create = () => {
  const { token, userId } = useAuth();
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [questionArray, setQuestionArray] = useState([{question: "", answer: ""}]);
  const [nQuestion, setNQuestion] = useState(0);
  let answerArray = [];
  let jsonArray = [];

  useEffect(() => {
    const getUser = async () => {
      console.log("Here");
      try {
        const res = await axios.get(
          `http://localhost:4000/api/users/${userId}`
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const renderNewDiv = () => {
    console.log("Adding...");
    if (nQuestion <= 15) {
    setQuestionArray([
      ...questionArray, 
      { question: "hi", answer: "hi" }
    ]);
  } else {
    console.log("Unable to add more!");
  }
    setNQuestion(nQuestion+1);
    console.log("nquestion ->", nQuestion);
    console.log("questionarray-> ", questionArray);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    jsonArray.push({question: question, answer: answer});
    console.log("jsonArray->", jsonArray);
    console.log("nquestions ->", nQuestion);
  };

  return (
    <div className="temp-page container">
      <form onSubmit={handleSubmit}>
        {questionArray.map((item, index) => (
          <div key = {index}>
            <label>
              Enter Question {index + 1}:
              <input
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
              />
            </label>
            <label>
              Enter Answer:
              <input type="text" onChange={(e) => setAnswer(e.target.value)} />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <button onClick={renderNewDiv}>add</button>
    </div>
  );};

export default Create;
