import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/quizzes/all`,
        );
        console.log(res.data);
        setQuizzes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getQuizzes();
  }, []);

  const handleQuizRedirect = (url) => {
    console.log("url => ", url);
    navigate(`/quiz/${url}`);
  };


  useEffect( () => { 
    if (quizzes) { 
      setLoading(false);
      console.log(quizzes);
    }
  }, [quizzes]);

  if (loading) {
    <p>Loading...</p>
  } else {
  
  return (
    <div className="temp-page">
      {quizzes.map((item, index) => (
        <div key={index} className = "m-6">
          <h1> {item.quizName} </h1>
          <h1> Quiz Length: {item.quizLength} </h1>
          <h1> Category: {item.quizType} </h1>
          <h1> Author: {item.author.username} </h1>
          <h1> Avg score per user: {item.quizAvg.toFixed(2)} </h1>
          <h1> Hits/Viewcount: {item.viewCount}</h1>
          <button className = "text-red-500" onClick = {() => handleQuizRedirect(item._id)}> Take Quiz </button>
        </div>
      ))}
    </div>
  );
}
}
export default AllQuizzes