import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/authProvider";
import '../styles/Create.css'
import { v4 as uuidv4 } from "uuid";
// source on uuid https://stackoverflow.com/questions/71814357/a-right-way-to-use-uuid-as-key-in-react

const Create = () => {
  const { userId } = useAuth();
  const [question, setQuestion] = useState();
  const [title, setTitle] = useState();
  const [userQuestions, setUserQuestions] = useState([{id: uuidv4(), question: "", answer: "", option2: "", option3: ""}]);
  const [nQuestion, setNQuestion] = useState(0);

  // -------------------------------------------------------------------------------
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
    setUserQuestions([
      ...userQuestions,
      {id: uuidv4(), question: "", answer: "", option2: "", option3: ""}
    ]);
  } else {
    console.log("Unable to add more!");
  }
    setNQuestion(nQuestion+1);
  };
  // -------------------------------------------------------------------------------
  const handleQuestionChange = (index, question) => {
    console.log("UserQuestion array: ", userQuestions);
    const temp = [...userQuestions]; // dupe current question array
    temp[index].question = question; // go to the index, change the question value
    setUserQuestions(temp); // set the userquestion array to editted temp one
  };

  const handleAnswerChange = (index, answer) => {
    console.log("UserQuestion array: ", userQuestions);
    const temp = [...userQuestions]; // dupe current question array
    temp[index].answer = answer; // go to the index, change the question value
    setUserQuestions(temp); // set the userquestion array to editted temp one
  };

  const handleOption2Change = (index, option) => {
    console.log("UserQuestion array: ", userQuestions);
    const temp = [...userQuestions]; // dupe current question array
    temp[index].option2 = option; // go to the index, change the question value
    setUserQuestions(temp); // set the userquestion array to editted temp one
  };

  const handleOption3Change = (index, option) => {
    const temp = [...userQuestions]; // dupe current question array
    temp[index].option3 = option; // go to the index, change the question value
    setUserQuestions(temp); // set the userquestion array to editted temp one
  };

  const deleteQuestion = (targetIndex) => {
    console.log("Deleting at index ", targetIndex);
    console.log("before delete: ", userQuestions);
    const newArray = userQuestions.filter((item, index) => index !== targetIndex);
    console.log("After delete: ", newArray);
    setUserQuestions(newArray);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userQuestions);
  };

  useEffect( () => {
    console.log("userq: ", userQuestions);
  }, [userQuestions]);
  

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
              {userQuestions.map((item, index) => (
                <div key = {item.id} className='create-question'>
                  <div className='create-what-question'>
                    <label className='create-label'>
                      <input
                        type='text'
                        className='create-inputs'
                        placeholder='Enter Question: '
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
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
                      onChange={(e) => handleAnswerChange(index, e.target.value)} 
                      required
                      />
                    </label>
                    <label className='create-label'>
                      <input 
                      type='text' 
                      className='create-inputs' 
                      placeholder='Wrong Answer: '
                      onChange={(e) => handleOption2Change(index, e.target.value)} 
                      required
                      />
                    </label>
                    <label className='create-label'>
                      <input 
                      type='text' 
                      className='create-inputs' 
                      placeholder='Wrong Answer: '
                      onChange={(e) => handleOption3Change(index, e.target.value)} 
                      required
                      />
                    </label>
                  </div>
                  <button type = "button" onClick = {() => deleteQuestion(index)}>Delete</button>
                </div>
              ))}
            </div>
            <button type = "button" onClick={renderNewDiv}>
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
