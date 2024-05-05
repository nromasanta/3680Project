import axios from "axios";
import { useState, useEffect } from "react";
import "../../styles/Results.css"
import medal from "../../imgs/medal.png"

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
    <div className="results-lb-content">
      {quizLb.map((item, index) => (
        <div 
          className=
          {`results-lb-item 
          ${index === 0 ? "first-place" 
          : index === 1 ? "second-place" 
          : index === 2 ? "third-place" : ''}`} 
          key={index}
        >
          <p className="results-lb-text">
            {index === 0 && <img src={medal} className=" medal-img first-place"/>}
            {index === 1 && <img src={medal} className="medal-img second-place" />}
            {index === 2 && <img src={medal} className="medal-img third-place" />}
            {`${index > 2 ? index + 1 + ". " : ""}${item.user.username} - ${item.score}`}
          </p>
        </div>
      ))}
    </div>
  );
};
export default QuizLeaderboard;
