import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/authProvider";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import "../styles/Create.css";
import { useNavigate } from "react-router-dom";
// source on uuid https://stackoverflow.com/questions/71814357/a-right-way-to-use-uuid-as-key-in-react

const Create = () => {
  const { userId } = useAuth();
  const [question, setQuestion] = useState();
  const [title, setTitle] = useState();
  const [quizDescription, setQuizDescription] = useState();
  const [tag, setTag] = useState();
  const [userQuestions, setUserQuestions] = useState([
    { id: uuidv4(), question: "", answer: "", option2: "", option3: "" },
  ]);
  const navigate = useNavigate();
  const [quizLength, setQuizLength] = useState(1);
  const [nQuestion, setNQuestion] = useState(2);
  const tags = [
    { value: "Art", label: "Art" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Geography", label: "Geography" },
    { value: "History", label: "History" },
    { value: "Language", label: "Language" },
    { value: "Literature", label: "Literature" },
    { value: "Math", label: "Math" },
    { value: "Music", label: "Music" },
    { value: "Personal", label: "Personal" },
    { value: "Science", label: "Science" },
    { value: "Sports", label: "Sports" },
    { value: "Other", label: "Other" },
  ];

  // -------------------------------------------------------------------------------
  useEffect(() => {
    const getUser = async () => {
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
    if (nQuestion <= 15) {
      setUserQuestions([
        ...userQuestions,
        { id: uuidv4(), question: "", answer: "", option2: "", option3: "" },
      ]);
      setQuizLength(quizLength + 1);
      setNQuestion(nQuestion + 1);
    } else {
      console.log("Max questions reached");
    }
  };
  // -------------------------------------------------------------------------------
  const handleQuestionChange = (index, question) => {
    const temp = [...userQuestions]; // dupe current question array
    temp[index].question = question; // go to the index, change the question value
    setUserQuestions(temp); // set the userquestion array to editted temp one
  };

  const handleAnswerChange = (index, answer) => {
    const temp = [...userQuestions]; // dupe current question array
    temp[index].answer = answer; // go to the index, change the question value
    setUserQuestions(temp); // set the userquestion array to editted temp one
  };

  const handleOption2Change = (index, option) => {
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
    const newArray = userQuestions.filter(
      (item, index) => index !== targetIndex
    );
    console.log("After delete: ", newArray);
    setUserQuestions(newArray);
  };

  const handleSelectChange = (e) => {
    setTag(e.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUserQuestions = userQuestions;
    newUserQuestions.forEach(item => delete item.id);
    console.log("newuser ->", newUserQuestions);
    const jsonBody = {
      author: userId,
      quizName: title,
      quizLength: quizLength,
      questions: newUserQuestions,
      quizType: tag,
      quizDescription: quizDescription
    };
    try {
      console.log("Questions -> ", jsonBody.questions);
      const res = await axios.post(
        `http://localhost:4000/api/quizzes/`,
        jsonBody
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    console.log(jsonBody);
    console.log(userQuestions);
    navigate('/allquizzes');
  };

  return (
    <div className="create-page content set-container">
      <div className="create-a-quiz">
        <p className="create-page-header">Create A Quiz</p>
        <form onSubmit={handleSubmit} className="create-form">
          <div className="create-header">
            <p className="create-title-label">Step 1: Title</p>
            <div className="create-title">
              <label className="create-label">
                <input
                  type="text"
                  id="text"
                  className="create-inputs"
                  placeholder="Quiz Title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label className="create-label">
                <input
                  type="text"
                  id="text"
                  className="create-inputs"
                  maxLength= "50"
                  placeholder="Quiz Description (max. 50 characters)"
                  onChange={(e) => setQuizDescription(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>

          <hr />

          <div className="create-content">
            <p className="create-title-label">Step 2: Q&A</p>
            <div className="create-question-container">
              {userQuestions.map((item, index) => (
                <div key={item.id} className="create-question">
                  <div className="create-what-question">
                    <label className="create-label">
                      <input
                        type="text"
                        className="create-inputs"
                        placeholder="Enter Question: "
                        onChange={(e) =>
                          handleQuestionChange(index, e.target.value)
                        }
                        required
                      />
                    </label>
                  </div>
                  <div className="create-answers">
                    <label className="create-label">
                      <input
                        type="text"
                        className="create-inputs"
                        placeholder="Correct Answer: "
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
                        required
                      />
                    </label>
                    <label className="create-label">
                      <input
                        type="text"
                        className="create-inputs"
                        placeholder="Wrong Answer: "
                        onChange={(e) =>
                          handleOption2Change(index, e.target.value)
                        }
                        required
                      />
                    </label>
                    <label className="create-label">
                      <input
                        type="text"
                        className="create-inputs"
                        placeholder="Wrong Answer: "
                        onChange={(e) =>
                          handleOption3Change(index, e.target.value)
                        }
                        required
                      />
                    </label>
                  </div>
                  <button 
                    className="login-btn create-button" 
                    type="button" 
                    onClick={() => deleteQuestion(index)}
                    >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={renderNewDiv}>
              <p className="login-btn create-add-button">
                Add Another Question
              </p>
            </button>
          </div>

          <hr />

          <div className="create-tags">
            <p className="create-title-label">Step 3: Tags</p>
            <div className="create-tag-select">
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: 200,
                  }),
                }}
                placeholder={tag || "Select tag..."}
                options={tags}
                onChange={(e) => handleSelectChange(e)}
              />
            </div>
          </div>

          <hr />

          <div className="create-button-container">
            <button type="submit">
              <p className="login-btn create-button">Create Quiz</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
