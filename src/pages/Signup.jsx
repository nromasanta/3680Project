import { React, useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Signup.css'
import { Link } from 'react-router-dom';

const Signup = () => {
  const [loginRequest, setLoginRequest] = useState(false);
  const [existingUserError, setExistingUserError] = useState(false);
  const [user, setUser] = useState({ email: null, username: null, password: null });


  useEffect(() => {
    if (loginRequest) {
      const callLogin = async () => {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/users/",
            user
          );
          console.log("Response status ->", response.status);
          if (response.status === 200) {
            console.log("User successfully created");
          } else if (response.status === 201) {
            console.log("User already exists");
          }
        } catch (err) {
          console.log("Unknown error ->", err);
        }
      };
      callLogin();
    }
  }, [loginRequest]);

  const saveUserData = (e) => {
    e.preventDefault();
    const newEmail = document.getElementById("email").value;
    const newUsername = document.getElementById("username").value;
    const newPassword = document.getElementById("password").value;
    if (newEmail != null && newUsername != null && newPassword != null) {
      setUser({
        email: newEmail,
        username: newUsername,
        password: newPassword,
      });
      setLoginRequest(true);
    } else {
      console.log("Please enter a username and password!");
    }
  };

    // for debugging, remove in final version
    useEffect(() => {
      if (user.username != null && user.password != null) {
        console.log(user);
      }
    }, [user]);

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
              type='email'
              id='email'
              className='signup-input'
              required
              />
            </label>
            
            <label className='signup-label'>
              <p>Username <span>*</span></p>
              <input
              type='username'
              id='username'
              className='signup-input'
              required
              />
            </label>

            <label className='signup-label'>
              <p>Password <span>*</span></p>
              <input
              type='password'
              id='password'
              className='signup-input'
              required
              />
            </label>
          <div className='signup-button-can'>
            <button className='signup-button' onClick={(e) => saveUserData(e)}>
              Create an Account
            </button>
            <p className='signup-button-text'>By registering, you agree to QuizCraft's
              <a href=''>
                <span className='signup-button-link'>{' '}Terms of Service.</span>
              </a>
            </p>
            <Link to='/login'>
              <p className='signup-button-link'>Already have an account?</p>
            </Link>
          </div>
        </div>
      </form>

    </div>
  </div>
  )
}

export default Signup