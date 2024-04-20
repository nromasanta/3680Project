import { React, useState, useEffect } from "react";
import "../styles/Signup.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginRequest, setLoginRequest] = useState(false);
  const [user, setUser] = useState({ username: null, password: null });

  // call if loginRequest changed && it is true
  useEffect(() => {
    if (loginRequest) {
      console.log("user is ->", user);
      const callLogin = async () => {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/users/login",
            user
          );
          if (response.status === 201) {
            console.log("Incorrect login information");
            setLoginRequest(false);
          } else if (response.status === 200) {
            console.log("Successful login");
            setLoginRequest(false);
          }
        } catch (err) {
          console.log("Unknown error -> ", err);
          setLoginRequest(false);
        }
      };
      callLogin();
    }
  }, [loginRequest]);

  // sanitize user input
  const saveUserData = (e) => {
    e.preventDefault();
    const newUsername = document.getElementById("username").value;
    const newPassword = document.getElementById("password").value;
    if (newUsername != null && newPassword != null) {
      setUser({
        username: newUsername,
        password: newPassword,
      });
      setLoginRequest(true);
    } else {
      console.log("Please enter a username or password!");
    }
  };

  // for debugging, remove in final version
  useEffect(() => {
    if (user.username != null && user.password != null) {
      console.log(user);
    }
  }, [user]);

  return (
    <div className="container signup-page">
      <div className="login-container">
        <form className="signup-form">
          <div className="login-title">
            <div className="login-return">
              <Link to="/">&#60; &#160;Go Back</Link>
            </div>
            <h1>Welcome Back!</h1>
            <p className="signup-title-text">We're happy to have you here!</p>
          </div>
          <div className="login-content">
            <label className="signup-label">
              <p>
                Username <span>*</span>
              </p>
              <input
                type="username"
                id="username"
                className="signup-input"
                required
              />
            </label>

            <label className="signup-label">
              <p>
                Password <span>*</span>
              </p>
              <input
                type="password"
                id="password"
                className="signup-input"
                required
              />
            </label>
            <div className="signup-button-can">
              <button
                className="signup-button"
                onClick={(e) => saveUserData(e)}
              >
                Log In
              </button>
              <a href="/signup">
                <p className="signup-button-link">Don't have an Account?</p>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
