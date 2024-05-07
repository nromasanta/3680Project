import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/authProvider.jsx";
import axios from "axios";
import QuizLeaderboard from "../components/Quiz/QuizLeaderboard.jsx";
import "../styles/Results.css";
import { useRafState } from "react-use";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

function QuizResults() {
  const { userId } = useAuth();
  const { state: { answerArray, selectedArray, quizLength, quizFullJson } } = useLocation();
  const { _id: quizId, quizName, questions } = quizFullJson;
  const [percentage, setPercentage] = useState(0);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [likedComments, setLikedComments] = useState({});
  const [rating, setRating] = useState(null); // State to hold the rating

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

  const handleLike = async (commentId) => {
    try {
      // Check if the comment is already liked by the current user
      const alreadyLiked = likedComments[commentId];

      if (alreadyLiked) {
        // If already liked, remove the like
        await axios.post(`http://localhost:4000/api/comments/like`, { commentId: commentId, changeLike: 0 });
      } else {
        // If not already liked, add the like
        await axios.post(`http://localhost:4000/api/comments/like`, { commentId: commentId, changeLike: 1 });
      }

      // Update the liked state for the comment
      setLikedComments(prevState => ({
        ...prevState,
        [commentId]: !prevState[commentId]
      }));

      // Fetch comments after updating like status
      getComments();
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
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
                <span className="results-correct-answer font-bold mr-1 text-green-500">
                  Correct Answer:
                </span>
                {item.answer}
              </p>

              <p className="results-correct-answer">
                <span
                  className={`font-bold mr-1 ${
                    item.answer === selectedArray[index]
                      ? "results-correct"
                      : "results-incorrect"
                  }`}
                >
                  You Answered:
                </span>
                {selectedArray[index]}
              </p>
            </div>
          ))}

          <div className="flex justify-center">
            <button onClick={publishScore} className="results-post-button">
              Post Score
            </button>
          </div>
        </div>

        <hr />

        <div className="results-leaderboard">
          <p className="results-lb-head quiz-title">Leaderboard:</p>
          <QuizLeaderboard quizId={quizId} />
        </div>

        <hr />


        <div className="results-comments-head">
          <div className="results-comments-actual">
            <p className="results-comments-title">Leave a comment:</p>
            <textarea id="comment"></textarea>
          </div>

          <div className="results-rating">
            <p className="results-rating-title">Rate this quiz:</p>
            <div className="results-rating-stars">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`star ${value <= rating ? "filled" : ""}`}
                  onClick={() => handleRatingChange(value)}
                >
                  {value <= rating ? (
                    <FontAwesomeIcon icon={solidStar} className="results-star" size="lg"/>
                  ) : (
                    <FontAwesomeIcon icon={regularStar} className="results-star" size="lg"/>
                  )}
                </span>
              ))}
            </div>
          </div>
          
          <button onClick={publishComment} className="results-post-button">Publish Review</button>
        </div>

        <hr />

        <div className="results-comments-shown">
          <p className="user-comments-title">User Comments:</p>
          {comments && (
            <div className="user-comments">
              {comments.map((item, index) => (
                <div key={index} className="quiz-each-comment">
                  <div className="quiz-each-left">
                    <p className="quiz-comment-username">Username: {item.username}</p>
                    <div className="quiz-comment-comment">
                      <p>Comment:</p>
                      <p className="flex flex-wrap">{item.comment}</p>
                    </div>
                  </div>
                  <div className="quiz-each-middle">
                    <p className="quiz-comment-rating">Rating: {item.rating} stars</p>
                    <p
                      className="quiz-comment-likes cursor-pointer"
                    >
                      {likes[index]} likes
                    </p>
                  </div>
                  <div className="quiz-each-right">
                  <button onClick={() => handleLike(item._id)}>
                    <FontAwesomeIcon 
                    icon={likedComments[item._id] ? solidHeart : regularHeart} 
                    className="results-heart"
                    />
                  </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default QuizResults;