import { memo } from "react";
import "../../styles/Quiz.css"

const shuffleArray = (array) => {
  // added a shuffle sequence
  // see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  // for the algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const ListQuizQuestions = memo(function ListQuizQuestions({ item, handleAnswer, index }) {
  const options = [item.answer, item.option2, item.option3];
  const shuffledOptions = shuffleArray(options);

  return (
    <div>
      {shuffledOptions.map((option, i) => (
        <button 
          className="quiz-answer"
          key={`item${i + 1}${index}`} 
          id={`item${i + 1}${index}`} 
          value={option} 
          onClick={(e) => handleAnswer(e, index, i + 1)}
        >
          {`${i + 1}. ${option}`}
        </button>
      ))}
    </div>
  );
});

export default ListQuizQuestions;
