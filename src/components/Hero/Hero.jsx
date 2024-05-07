import React from 'react'
import './Hero.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authProvider';

const Hero = () => {

  const { token } = useAuth();
  console.log(token);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (token) {
      navigate("/allquizzes");
    }
    else {
      navigate("/signup");
    }
  }
  
  return (
    <div className='hero set-container'>
        <div className='hero-text'>
            <h1>Create and Answer Quizzes Made By Users. For Users.</h1>
            <p>Answer user created quizzes from a plethora of categories.</p>
            <div>
              <button 
              className='hero-btn' 
              onClick={(handleRedirect)}
              >
                Get Started
              </button>
            </div>
        </div>
    </div>
  )
}

export default Hero