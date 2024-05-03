import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/authProvider";
import '../styles/Create.css'

const Create = () => {
  const { token, userId } = useAuth();
  const [question, setQuestion, title, setTitle] = useState();
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
    <div className='create-page content set-container'>
      <div className='create-a-quiz'>
      <p className='create-page-header'>Create A Quiz</p>
        <form onSubmit={handleSubmit} className='create-form'>
          <div className='create-header'>
            <p className='create-title-label'>Step 1: Title</p>
            <div className='create-title'>
                <label className='create-label'>
                  <input
                    type='text'
                    id='text'
                    className='create-inputs'
                    placeholder='Quiz Title'
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </label>
            </div>
          </div>

          <hr/>

          <div className='create-content'>
            <p className='create-title-label'>Step 2: Q&A</p>
            <div className='create-question-container'>
              {questionArray.map((item, index) => (
                <div key = {index} className='create-question'>
                  <div className='create-what-question'>
                    <label className='create-label'>
                      <input
                        type='text'
                        className='create-inputs'
                        placeholder='Enter Question: '
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <div className='create-answers'>
                    <label className='create-label'>
                      <input 
                      type='text' 
                      className='create-inputs' 
                      placeholder='Correct Answer: '
                      onChange={(e) => setAnswer(e.target.value)} 
                      required
                      />
                    </label>
                    <label className='create-label'>
                      <input 
                      type='text' 
                      className='create-inputs' 
                      placeholder='Wrong Answer: '
                      onChange={(e) => setAnswer(e.target.value)} 
                      required
                      />
                    </label>
                    <label className='create-label'>
                      <input 
                      type='text' 
                      className='create-inputs' 
                      placeholder='Wrong Answer: '
                      onChange={(e) => setAnswer(e.target.value)} 
                      required
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={renderNewDiv}>
              <p className='login-btn create-add-button'>
                Add Another Question
              </p>
            </button>
          </div>
          
          <hr/>

          <div className='create-tags'>
            <p className='create-title-label'>Step 3: Tags</p>
          </div>

          <hr/>

          <div className='create-button-container'>
            <button type='submit'>
              <p className='login-btn create-button'>
                Create Quiz
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );};

export default Create;
