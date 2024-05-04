import axios from "axios";
import { useState, useEffect } from "react";

const QuizLeaderboard = ({ quizId }) => {
  const [quizLb, setQuizLb] = useState([]);
  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/quizzes/leaderboard/${quizId}`
        );
        console.log(res);
        let temp = res.data;
        console.log(temp);
        if (temp) {
          temp.sort((a, b) => b.score - a.score);
        }
        setQuizLb(temp);   
      } catch (err) {
        console.log(err);
      }
    };
    getLeaderboard();
  }, [quizId]);

  if (quizLb.length === 0) {
    return (
        <div>
            <p>No leaderboard entries</p>
        </div>
    )
  }
  return(
    <div>
        {quizLb.map((item, index) => (
            <div>
                <h1> {index + 1}. {item.user.username} - {item.score}</h1>
            </div>
  ))}
    </div>
  );
};
export default QuizLeaderboard;
