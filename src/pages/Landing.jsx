import React, { Component } from "react";
import { useState, useCallback, useEffect } from "react";
import Hero from "../components/Hero/Hero.jsx";
import Featured from "../components/Featured/Featured.jsx";
import axios from "axios";

function Landing() {
  const [quizzes, setQuizzes] = useState();
  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/quizzes/topQuizzes`
        );
        console.log(res.data);
        setQuizzes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getQuizzes();
  }, []);

  if (quizzes) {
    return (
      <div className="landing-page">
        <Hero />
        <div className="set-container">
          <Featured quizArray={quizzes} />
        </div>
      </div>
    );
  }
}

export default Landing;
