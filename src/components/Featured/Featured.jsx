import React from 'react'
import './Featured.css'

// The collection is auto-sorted by viewcount in the API call/controller function
const Featured = ({quizArray}) => {
  console.log("QA =>", quizArray);
  return (
    <div className='featured'>
      <h1>Top 3 by viewcount :</h1>
        {quizArray.slice(0,3).map((item, index) => (
        <div key={index} className="m-6">
          <h1> {item.quizName} </h1>
        </div>
      ))}
    </div>
  )
}

export default Featured