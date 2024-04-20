import React from 'react'
import '../styles/Signup.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='container signup-page'>
      <div className='login-container'>
        <form className='signup-form'>
          <div className='login-title'>
            <div className='login-return'>
              <Link to="/">
                &#60; &#160;Go Back
              </Link>
            </div>
            <h1>Welcome Back!</h1>
            <p className='signup-title-text'>We're happy to have you here!</p>
          </div>
          <div className='login-content'>
              
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
                Log In
              </button>
              <a href='/signup'>
                <p className='signup-button-link'>Don't have an Account?</p>
              </a>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login