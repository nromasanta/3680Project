import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <div className='hero container'>
        <div className='hero-text'>
            <h1>Create and Answer Quizzes Made By Users. For Users.</h1>
            <p>Answer user created quizzes from a plethora of categories.</p>
            <a href='/signup'>
                <button className='btn'>Join QuizCraft</button>
            </a>
        </div>
    </div>
  )
}

export default Hero