import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/authProvider.jsx";
import axios from "axios";
import QuizLeaderboard from "../components/Quiz/QuizLeaderboard.jsx";
import "../styles/Results.css"
import { useRafState } from "react-use";

function QuizResults() {
  const { userId } = useAuth();
  const { state: { answerArray, selectedArray, quizLength, quizFullJson } } = useLocation();
  const { _id: quizId, quizName, questions } = quizFullJson;
  const [percentage, setPercentage] = useState(0);
  const[comments, setComments] = useState();
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    console.log("Answer Array => ", answerArray);
    console.log("Selected Array => ", selectedArray);
    console.log("Quiz Length => ", quizLength);
    console.log("Quiz => ", quizFullJson);

    const correctAnswerCount = answerArray.reduce((acc, answer, index) => {
      if (answer === selectedArray[index]) {
        return acc + 1;
      }
      return acc;
    }, 0);
    const percentCorrect = ((correctAnswerCount / quizLength) * 100).toFixed(2);
    setPercentage(percentCorrect);
    getComments();
  }, [answerArray, selectedArray, quizLength, quizFullJson]);

  const publishScore = async () => {
    const jsonBody = {
      user: userId,
      score: percentage,
    };

    console.log("Sending ----> ", jsonBody);

    try {
      const res = await axios.post(
        `http://localhost:4000/api/quizzes/publishScore/${quizId}`,
        jsonBody
      );
      console.log(res);
    } catch (err) {
      console.log("Error posting score: ", err);
    }
  };

  const publishComment = async () => {
    let userComment = document.getElementById("comment").value;
    var userRating = document.getElementsByName("rating");
    var rating;
    for (var i = 0, length = userRating.length; i< length; i++ ) {
      if (userRating[i].checked) {
          rating = userRating[i].value;
      }
    }

    const comment = {
      userID: userId,
      quizID: quizId,
      comment: userComment,
      rating: rating,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/api/comments`,
        comment
      );
      console.log(res);
    } catch (err) {
      console.log("Error publishing comment: ", err);
    }
    document.getElementById("comment").value = "";
    getComments();
  };

  const getComments = async () => {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/comments/quiz`,{
        quizId: quizId
      }
      );
      var comment = res;
      var like = [];
      for (let i = 0; i <res.data.length; i++) {
      var id = comment.data[i].userID;
      like.push(comment.data[i].likes)
      const user = await axios.get(
        `http://localhost:4000/api/users/${id}`
      );
      comment.data[i].username = user.data.username;
    }
    setLikes(like);
    //console.log("Quiz Comments-> ", comment);
      setComments(comment.data);
      console.log("Comments: ",comments);
    } catch (err) {
        console.log("Error:", err);
    }
  };
 
  const updateLikes = async (id) => {
    try {
        const res = await axios.post(
          `http://localhost:4000/api/comments/like`, {
            commentId: id
          }
        );
        console.log(res);
        getComments();
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div className="results-page content set-container">
      <div className="results-page-container">
        <div className="results-page-head-can">
          <p className="quiz-title">{quizName}</p>
          <p className="results-score">Score: {percentage}% </p>
        </div>
        <hr />

        <div className="results-questions">
          {questions.map((item, index) => (
            <div key={index} className="quiz-each-question">
              <p className="quiz-question">
                <span className="font-bold">Question:</span>
                {item.question}
              </p>

              <p className="results-correct-answer"> 
                <span 
                className="results-correct-answer font-bold mr-1 text-green-500"
                >
                  Correct Answer:
                </span> 
              {item.answer}
              </p>

              <p className="results-correct-answer"> 
              <span 
              className={`font-bold mr-1 ${item.answer === selectedArray[index] 
              ? "results-correct" : "results-incorrect"}`}
              >
                You Answered:
              </span> 
              {selectedArray[index]}
            </p>
            </div>
          ))}

          <div className="flex justify-center">
            <button 
            onClick={publishScore}
            className="results-post-button"
            >
              Post Score
            </button>
          </div>
        </div>

        <hr/>

        <div className="results-leaderboard">
          <p className="results-lb-head quiz-title">Leaderboard:</p>
          <QuizLeaderboard quizId={quizId} />
        </div>

        <hr/>

        <div className="results-comments">
          <div className="results-comments-head">
            <p>Leave a comment:</p>
            <textarea id="comment"></textarea><br/>
            <input type="radio" name="rating" value="1"></input>
            <input type="radio" name="rating" value="2"></input>
            <input type="radio" name="rating" value="3"></input>
            <input type="radio" name="rating" value="4"></input>
            <input type="radio" name="rating" value="5"></input><br/>
            <button onClick={() => publishComment()}>Join the Conversation</button>
      </div>

          <div className="results-comments-shown">
            <p>Comments:</p>
            {comments && (
            <div id="user-comments">
                {comments.map((item,index) => (
                  <div key={index} className="quiz-each-comment">
                    <p className="quiz-comment-username">
                      {item.username}
                    </p>
                    <p className="quiz-comment-comment">
                      {item.comment}
                    </p>
                    <p className="quiz-comment-rating">
                      {item.rating} stars
                    </p>
                    <p className="quiz-comment-likes cursor-pointer" onClick={() => updateLikes(item._id)}>
                      {likes[index]} likes
                    </p>
                  </div>
                ))}
            </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default QuizResults;
