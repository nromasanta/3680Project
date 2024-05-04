import { memo } from "react";

  const ListQuizQuestions = memo(function ListQuizQuestions({item, handleAnswer, index}) {
    let number = item.number[index];
    if (number === 1) {
      return (
        <div>
          <button id = {'item1' + index} value = {item.answer} onClick = {(e) => handleAnswer(e, index, 1)} > 1. {item.answer} </button>
          <button id = {'item2' + index} value = {item.option2} onClick = {(e) => handleAnswer(e, index, 2)}> 2. {item.option2} </button>
          <button id = {'item3' + index} value = {item.option3} onClick = {(e) => handleAnswer(e, index, 3)}> 3. {item.option3} </button>
        </div>
      );
    } else if (number === 2) {
      return (
        <div>
          <button id = {'item1' + index} value = {item.option2} onClick = {(e) => handleAnswer(e, index, 1)}> 1. {item.option2} </button>
          <button id = {'item2' + index} value = {item.answer} onClick = {(e) => handleAnswer(e, index, 2)}> 2. {item.answer} </button>
          <button id = {'item3' + index} value = {item.option3} onClick = {(e) => handleAnswer(e, index, 3)}> 3. {item.option3} </button>
        </div>
      );
    } else if (number === 3) {
      return (
        <div>
          <button id = {'item1' + index} value = {item.option2} onClick = {(e) => handleAnswer(e, index, 1)}> 1. {item.option2} </button>
          <button id = {'item2' + index} value = {item.option3} onClick = {(e) => handleAnswer(e, index, 2)}> 2. {item.option3} </button>
          <button id = {'item3' + index} value = {item.answer} onClick = {(e) => handleAnswer(e, index, 3)}> 3. {item.answer} </button>
        </div>
      );
    } else if (number === 4) {
      return (
        <div>
          <button id = {'item1' + index} value = {item.option3} onClick = {(e) => handleAnswer(e, index, 1)}> 1. {item.option3} </button>
          <button id = {'item2' + index} value = {item.option2} onClick = {(e) => handleAnswer(e, index, 2)}> 2. {item.option2} </button>
          <button id = {'item3' + index} value = {item.answer} onClick = {(e) => handleAnswer(e, index, 3)}> 3. {item.answer} </button>
        </div>
      );
    } else if (number === 5) {
      return (
        <div>
          <button id = {'item1' + index} value = {item.answer} onClick = {(e) => handleAnswer(e, index, 1)}> 1. {item.answer} </button>
          <button id = {'item2' + index} value = {item.option3} onClick = {(e) => handleAnswer(e, index, 2)}> 2. {item.option3} </button>
          <button id = {'item3' + index} value = {item.option2} onClick = {(e) => handleAnswer(e, index, 3)}> 3. {item.option2} </button>
        </div>
      );
    } else if (number === 6) {
      return (
        <div>
          <button id = {'item1' + index} value = {item.option3} onClick = {(e) => handleAnswer(e, index, 1)}> 1. {item.option3} </button>
          <button id = {'item2' + index} value = {item.answer} onClick = {(e) => handleAnswer(e, index, 2)}> 2. {item.answer} </button>
          <button id = {'item3' + index} value = {item.option2} onClick = {(e) => handleAnswer(e, index, 3)}> 3. {item.option2} </button>
        </div>
      );
    }
  });

  export default ListQuizQuestions;