import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import logo from "../imgs/logo.png";
import "../styles/AllQuizzes.css"

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState();
  const [displayedQuizzes, setDisplayedQuizzes] = useState();
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState("All");
  const navigate = useNavigate();

  const tags = [
    { value : "All", label: "All"},
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

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/quizzes/all`);
        console.log(res.data);
        res.data.forEach((item) => (item.uuidv = uuidv4()));
        setQuizzes(res.data);
        setDisplayedQuizzes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getQuizzes();
  }, []);

  const filterByTag = (value) => {
    if (value === "All") {
      setDisplayedQuizzes(quizzes);
    } else {
      const filteredArray = quizzes.filter((item) =>
        item.quizType.includes(value)
      );
      setDisplayedQuizzes(filteredArray);
    }
  };

  const handleQuizRedirect = (url) => {
    console.log("url => ", url);
    navigate(`/quiz/${url}`);
  };

  const handleSelectChange = (e) => {
    setTag(e.value);
    filterByTag(e.value);
  };

  useEffect(() => {
    if (quizzes) {
      setLoading(false);
      console.log(quizzes);
    }
  }, [quizzes]);

  if (loading) {
    <p>Loading...</p>;
  } else {
    return (
      <div className="all-page content set-container">
        <div className="all-page-container">
          <p className="all-page-header">
            Quizzes
          </p>
          <Select
            placeholder={tag || "Select Filter..."}
            options={tags}
            onChange={(e) => handleSelectChange(e)}
          />

          <div className="all-quizzes">
            {displayedQuizzes.length > 0 ? (
              displayedQuizzes.map((item, index) => (
                <div key={item.uuidv} className="all-each-quiz">
                  <img src={logo} className="all-quiz-img" onClick={() => handleQuizRedirect(item._id)}/>
                  <div className="all-quiz-content">
                    <p className="all-quiz-title" onClick={() => handleQuizRedirect(item._id)}> {item.quizName} </p>
                    <div className="all-quiz-questions">
                      <div className="all-quiz-questions-l">
                        <p> 
                          <span className="font-bold">Author: </span> 
                          {item.author.username} 
                        </p>
                        <p> 
                          <span className="font-bold">Tags: </span> 
                          {item.quizType} 
                        </p>
                        <p> 
                          <span className="font-bold">Description: </span> 
                          {item.quizDescription} 
                        </p>
                      </div>
                      <div className="all-quiz-questions-r">
                        <p> 
                          <span className="font-bold">Questions: </span> 
                          {item.quizLength} 
                        </p>
                        <p> 
                          <span className="font-bold">Average Score: </span> 
                          {item.quizAvg.toFixed(2)} 
                        </p>
                        <p> 
                          <span className="font-bold">Views: </span> 
                          {item.viewCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Uh oh. No one's made a quiz for that category yet.</div>
            )}
          </div>

        </div>
       </div>
    );
  }
};

export default AllQuizzes;
