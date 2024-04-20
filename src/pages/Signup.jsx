import React from 'react'
import '../styles/Signup.css'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='container signup-page'>
    <div className='signup-container'>
      <form className='signup-form'>
        <div className='signup-title'>
          <div className='login-return'>
            <Link to="/">
              &#60; &#160;Go Back
            </Link>
          </div>
          <h1>Create an Account</h1>
          <p className='signup-title-text'>Thanks for joining us!</p>
        </div>
        <div className='signup-content'>

            <label className='signup-label'>
              <p>Email <span>*</span></p>
              <input
              type="email"
              className='signup-input'
              required
              />
            </label>
            
            <label className='signup-label'>
              <p>Username <span>*</span></p>
              <input
              type="username"
              className='signup-input'
              required
              />
            </label>

            <label className='signup-label'>
              <p>Password <span>*</span></p>
              <input
              type="password"
              className='signup-input'
              required
              />
            </label>
          <div className='signup-button-can'>
            <button className="signup-button">
              Create an Account
            </button>
            <p className='signup-button-text'>By registering, you agree to QuizCraft's
              <a href=''>
                <span className='signup-button-link'>{' '}Terms of Service.</span>
              </a>
            </p>
            <a href='/login'>
              <p className='signup-button-link'>Already have an account?</p>
            </a>
          </div>
        </div>
      </form>

    </div>
  </div>
  )
}

export default Signup