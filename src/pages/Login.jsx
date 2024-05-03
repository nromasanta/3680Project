import { React, useState, useEffect, localStorage} from 'react';
import '../styles/Signup.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import AuthContext from '../auth/AuthContext';
import { useAuth } from '../auth/authProvider';
import { useNavigate } from 'react-router-dom';
import userIcon from '../imgs/user.png'
import password from '../imgs/password.png'

const Login = () => {
  const [loginRequest, setLoginRequest] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: null, password: null });
  const [wrongInfoError, setWrongInfoError] = useState(false);
  const { setToken, setUserId } = useAuth();
  const navigate = useNavigate();
 
  // call if loginRequest changed && it is true

      const callLogin = async () => {
        const newUsername = document.getElementById("username").value;
        const newPassword = document.getElementById("password").value;
        if (!newUsername || !newPassword) {
          console.log("Username/Password field empty");
          return;
        }
        const currentUser = {
          username: newUsername,
          password: newPassword
        };
        try {
          const response = await axios.post(
            "http://localhost:4000/api/users/login",
            currentUser
          );
          if (response.status === 201) {
            console.log("Incorrect login information");
            if (window.localStorage.getItem("userId")) {
              window.localStorage.removeItem("userId");
              window.localStorage.removeItem("token");
            }
            setLoginRequest(false);
            setWrongInfoError(true);
          } else if (response.status === 200) {
            console.log("Successful login _>", response);
            console.log(response.data.userId);
            setToken(response.data.token);
            setUserId(response.data.userId);
            setLoginRequest(false);
            setWrongInfoError(false);
            navigate("/");
          }
        } catch (err) {
          setToken(null);
          if (window.localStorage.getItem("userId")) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("userId");
          }
          console.log("Unknown error -> ", err);
          setLoginRequest(false);
        }
      };



  // sanitize user input
  const saveUserData = (e) => {
    e.preventDefault();
    const newUsername = document.getElementById("username").value;
    const newPassword = document.getElementById("password").value;
    if (newUsername != null && newPassword != null) {
      setLoginRequest(true);
      callLogin();
    } else {
      console.log("Please enter a username or password!");
    }
  };

  // for debugging, remove in final version
  useEffect(() => {
    if (currentUser.username != null && currentUser.password != null) {
      console.log(currentUser);
    }
  }, [currentUser]);

  return (
    <div className='set-container signup-page'>
      <div className='login-container'>
        <form className='signup-form'>
          <div className='login-title'>
            <div className='login-return'>
              <Link to="/">&#60; &#160;Go Back</Link>
            </div>
            <p className='signup-title-header'>Welcome Back!</p>
            <p className='signup-title-text'>We're happy to have you here!</p>
          </div>
          <div className='login-content'>
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
              <button
                className='signup-button'
                onClick={(e) => saveUserData(e)}
              >
                Log In
              </button>
              { wrongInfoError ? (
              <p className='error'>Incorrect username/password</p>

            ) : (<div> </div>)}
              <Link to='/signup'>
                <p className='signup-button-link'>Don't have an Account?</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
