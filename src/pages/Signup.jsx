import { React, useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Signup.css'
import { Link } from 'react-router-dom';
import userIcon from '../imgs/user.png'
import password from '../imgs/password.png'
import email from '../imgs/email.png'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [signupRequest, setsignupRequest] = useState();
  const [existingUserError, setExistingUserError] = useState(false);
  const [user, setUser] = useState({ email: null, username: null, password: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (signupRequest) {
      const callLogin = async () => {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/users/",
            user
          );
          console.log("Response status ->", response.status);
          if (response.status === 200) {
            console.log("User successfully created");
            setExistingUserError(false);
            navigate('/login');

          } else if (response.status === 201) {
            console.log("User already exists");
            setExistingUserError(true);
          }
        } catch (err) {
          console.log("Unknown error ->", err);
        }
      };
      callLogin();
    }
  }, [signupRequest]);

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
      setsignupRequest(newUsername);
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
    <div className='set-container signup-page'>
    <div className='signup-container'>
      <form className='signup-form'>
        <div className='signup-title'>
          <div className='login-return'>
            <Link to="/">
              &#60; &#160;Go Back
            </Link>
          </div>
          <h1 className='signup-title-header'>Create an Account</h1>
          <p className='signup-title-text'>Thanks for joining us!</p>
        </div>
        <div className='signup-content'>

          <div className='signup-label-container'>
              <label className='signup-label'>
                <img src={email}/>
                <input
                  type='email'
                  id='email'
                  className='signup-input'
                  placeholder='Email'
                  required
                />
              </label>
            </div>
            
            <div className='signup-label-container'>
              <label className='signup-label'>
                <img src={userIcon}/>
                <input
                  type='username'
                  id='username'
                  className='signup-input'
                  placeholder='Username'
                  required
                />
              </label>
            </div>

            <div className='signup-label-container'>
              <label className='signup-label'>
                <img src={password}/>
                <input
                  type='password'
                  id='password'
                  className='signup-input'
                  placeholder='Password'
                  required
                />
              </label>
            </div>

          <div className='signup-button-can'>
            <button className='signup-button' onClick={(e) => saveUserData(e)}>
              Create an Account
            </button>
            { existingUserError ? (
              <p className='error'>Username already taken</p>

            ) : (<div> </div>)}
            <p className='signup-button-text'>By registering, you agree to QuizCraft's
              <Link to=''>
                <span className='signup-button-link'>{' '}Terms of Service.</span>
              </Link>
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