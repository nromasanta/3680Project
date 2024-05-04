import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero set-container'>
        <div className='hero-text'>
            <h1>Create and Answer Quizzes Made By Users. For Users.</h1>
            <p>Answer user created quizzes from a plethora of categories.</p>
            <Link to='/signup'>
                <button className='hero-btn'>Join QuizCraft</button>
            </Link>
        </div>
    </div>
  )
}

export default Hero