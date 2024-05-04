import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";

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
      <div className="temp-page">
        <Select
          placeholder={tag || "Select Filter..."}
          options={tags}
          onChange={(e) => handleSelectChange(e)}
        />
        {displayedQuizzes.length > 0 ? (
          displayedQuizzes.map((item, index) => (
            <div key={item.uuidv} className="m-6">
              <h1> {item.quizName} </h1>
              <h1> Quiz Length: {item.quizLength} </h1>
              <h1> Category: {item.quizType} </h1>
              <h1> Author: {item.author.username} </h1>
              <h1> Avg score per user: {item.quizAvg.toFixed(2)} </h1>
              <h1> Hits/Viewcount: {item.viewCount}</h1>
              <button className="text-red-500" onClick={() => handleQuizRedirect(item._id)}>
                Take Quiz
              </button>
            </div>
          ))
        ) : (
          <div> No quizzes found</div>
        )}
      </div>
    );
  }
};

export default AllQuizzes;
