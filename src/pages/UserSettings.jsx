import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/authProvider';
import { useParams } from 'react-router-dom';
import '../styles/Settings.css';

const Settings = () => {
    //const { userId } = useAuth();
    const params = useParams();
    const userId = params.id;

  // new values the user wants to update
  const [newUsername, setNewUsername] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newEmail, setNewEmail] = useState(null);

  // for the passwords
  const [currentPassword, setCurrentPassword] = useState(null);
  const [retypedNewPassword, setRetypedNewPassword] = useState(null); // retyped password

  // make sure that the loggedInUser is initialized, then change loading to false
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // error messages
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

  // success messages
  const [usernameSuccessMessage, setUsernameSuccessMessage] = useState(null);
  const [emailSuccessMessage, setEmailSuccessMessage] = useState(null);
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState(null);

  const getUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/users/${userId}`
      );
      setLoggedInUser(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      console.log("User initialized");
      setLoading(false);
    }
  }, [loggedInUser]);

  const updateUserInfo = async () => {
    console.log("Updating");
    const jsonBody = {
      newUsername: newUsername,
      newPassword: newPassword,
      newEmail: newEmail,
      userId: userId,
    };
    try {
      const res = await axios.post(
        `http://localhost:4000/api/users/update/`,
        jsonBody
      );
      console.log("Success: ", res.data.message);

      // set success messages and reset state variables
      if (newUsername) {
        setUsernameSuccessMessage("Username changed");
        setEmailSuccessMessage(null);
        setPasswordSuccessMessage(null);
        document.getElementById("new-username").value = null;
        setNewUsername(null);

      } else if (newEmail) {
        setEmailSuccessMessage("Email changed");
        setUsernameSuccessMessage(null);
        setPasswordSuccessMessage(null);
        document.getElementById("new-email").value = null;
        setNewEmail(null);

      } else if (newPassword) {
        setPasswordSuccessMessage("Password changed");
        setEmailSuccessMessage(null);
        setUsernameSuccessMessage(null);
        document.getElementById("current-password").value = null;
        document.getElementById("new-password").value = null;
        document.getElementById("retyped-new-password").value = null;
        setCurrentPassword(null);
        setNewPassword(null);
        setRetypedNewPassword(null);
      }
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  // handlePasswordSubmit -> verifyCurrentPassword -> updateUserInfo
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (currentPassword && newPassword && retypedNewPassword) {
      if (newPassword && retypedNewPassword) {
        if (retypedNewPassword !== newPassword) {
          console.log("Passwords do not match!");
          setPasswordErrorMessage(
            "newPassword and retypedNewPassword do not match"
          );
        } else {
          console.log("Passwords match, submit");
          setPasswordErrorMessage(null);
          verifyCurrentPassword();
        }
      }
    } else {
      setPasswordErrorMessage("Please fill out all fields");
    }
  };

  const verifyCurrentPassword = async () => {
    try {
      const jsonPassword = { password: currentPassword };
      const res = await axios.post(
        `http://localhost:4000/api/users/checkPassword/${userId}`,
        jsonPassword
      );
      // status
      // 201 = wrong password
      // 200 = correct password
      if (res.status === 201) {
        setPasswordErrorMessage("Incorrect current password entered");
      } else if (res.status === 200) {
        updateUserInfo();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handleUsernameSubmit -> updateUserInfo
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (newUsername) {
      let newInfo = { valueToCheck: newUsername, type: "username" };
      try {
        const res = await axios.post(
          `http://localhost:4000/api/users/checkInfo`,
          newInfo
        );
        // status codes:
        // 201 = username in use
        // 200 = username not in use
        if (res.status === 201) {
          setUsernameErrorMessage("Username already taken");
        } else {
          setUsernameErrorMessage(null);
          updateUserInfo();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // handleEmailSubmit -> updateUserInfo
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (newEmail) {
      let newInfo = { valueToCheck: newEmail, type: "email" };
      try {
        const res = await axios.post(
          `http://localhost:4000/api/users/checkInfo`,
          newInfo
        );
        // status codes:
        // 201 = email in use
        // 200 = email not in use
        if (res.status === 201) {
          setEmailErrorMessage("Email already in use");
        } else {
          setEmailErrorMessage(null);
          updateUserInfo();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };


  const resetMessages = () => {

    // reset error messages
    setUsernameErrorMessage(null);
    setEmailErrorMessage(null);
    setPasswordErrorMessage(null);

    // reset success messages
    setUsernameSuccessMessage(null);
    setEmailSuccessMessage(null);
    setPasswordSuccessMessage(null);
  
  };


  const updateNewUsername = (value) => {
    setNewUsername(value);
    resetMessages();
  };

  const updateNewEmail = (value) => {
    setNewEmail(value);
    resetMessages();
  };

  const updateNewPassword = (value) => {
    setNewPassword(value);
    resetMessages();
  };





  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="settings-page content set-container">

        {/* ---Username--- */}
        <div className="settings-page-container settings-user">
          <div className="settings-user-left">
            <div className="settings-user-content settings-user-1">
              <p className="settings-user-text">Username</p>
              <p className="settings-user-text-2">
                Usernames allow others to see who created their favorite quizzes.
              </p>
            </div>
          </div>

          <div className="settings-user-right">
            <div className="settings-user-content settings-user-2">
              <form className="settings-user-form" onSubmit={handleUsernameSubmit}>
                <label className="settings-user-label">
                  <p className="settings-user-label-text">USERNAME</p>
                  <input
                    type="text"
                    className="settings-inputs"
                    id="new-username"
                    placeholder={loggedInUser.data.username}
                    onChange={(e) => updateNewUsername(e.target.value)}
                  />
                </label>
                <button type="submit" className="settings-user-button">
                  Save Changes
                </button>
                {usernameSuccessMessage && <p>{usernameSuccessMessage}</p>}
                {usernameErrorMessage && <p>{usernameErrorMessage}</p>}
              </form>
            </div>
          </div>
          
        </div>
        {/* -------------- */}

        {/* ---Email--- */}
        <div className="settings-page-container settings-user">
          <div className="settings-user-left">
            <div className="settings-user-content settings-user-1">
              <p className="settings-user-text">Personal Information</p>
              <p className="settings-user-text-2">
                This information is private 
                and will not be shared with other users. 
                Read the QuizCraft Privacy Notice anytime!
              </p>
            </div>
          </div>

          <div className="settings-user-right">
            <div className="settings-user-content settings-user-2">
              <form className="settings-user-form" onSubmit={handleEmailSubmit}>
                <label className="settings-user-label">
                  <p className="settings-user-label-text">EMAIL ADDRESS</p>
                  <input
                    type="text"
                    className="settings-inputs"
                    id="new-email"
                    placeholder={loggedInUser.data.email}
                    onChange={(e) => updateNewEmail(e.target.value)}
                  />
                </label>
                <button type="submit" className="settings-user-button">
                  Save Changes
                </button>
                {emailSuccessMessage && <p>{emailSuccessMessage}</p>}
                {emailErrorMessage && <p>{emailErrorMessage}</p>}
              </form>
            </div>
          </div>
          
        </div>
        {/* -------------- */}

        {/* ---Passwords--- */}
        <div className="settings-page-container settings-user">
          <div className="settings-user-left">
            <div className="settings-user-content settings-user-1">
              <p className="settings-user-text">Password</p>
              <p className="settings-user-text-2">
              We recommend that you periodically 
              update your password to help prevent 
              unauthorized access to your account.
              </p>
            </div>
          </div>

          <div className="settings-user-right">
            <div className="settings-user-content settings-user-2">
              <form className="settings-user-form" onSubmit={handlePasswordSubmit}>
                <label className="settings-user-label">
                  <p className="settings-user-label-text">CURRENT PASSWORD</p>
                  <input
                    type="text"
                    className="settings-inputs"
                    id="current-password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </label>

                <label className="settings-user-label">
                  <p className="settings-user-label-text">NEW PASSWORD</p>
                  <input
                    type="text"
                    className="settings-inputs"
                    id="new-password"
                    onChange={(e) => updateNewPassword(e.target.value)}
                  />
                </label>

                <label className="settings-user-label">
                  <p className="settings-user-label-text">CONFIRM NEW PASSWORD</p>
                  <input
                    type="text"
                    className="settings-inputs"
                    id="retyped-new-password"
                    onChange={(e) => setRetypedNewPassword(e.target.value)}
                  />
                </label>

                <button type="submit" className="settings-user-button">
                  Save Changes
                </button>
                {passwordSuccessMessage && <p>{passwordSuccessMessage}</p>}
                {passwordErrorMessage && <p>{passwordErrorMessage}</p>}

              </form>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
};

export default Settings;