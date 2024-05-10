import { React, useState, useEffect } from 'react';
import axios from 'axios';
// import AuthContext from '../auth/AuthContext';
import { useAuth } from '../auth/authProvider';
import { useParams } from 'react-router-dom';

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
      <div className="temp-page container">
        {/* Current Information */}
        <div>
          <h1> Hello, {loggedInUser.data.username}</h1>
          <h1> Email: {loggedInUser.data.email}</h1>
        </div>
        {/* ---Username--- */}
        <div className="flex-col border border-red-500">
          <form onSubmit={handleUsernameSubmit}>
            <label>
              Enter New Username:
              <input
                type="text"
                id="new-username"
                placeholder="New Username"
                onChange={(e) => updateNewUsername(e.target.value)}
              />
            </label>
            <button type="submit">Change Username</button>
            {usernameSuccessMessage && <p>{usernameSuccessMessage}</p>}
            {usernameErrorMessage && <p>{usernameErrorMessage}</p>}
          </form>
        </div>

        {/* ---Email--- */}
        <div className="flex-col border border-red-500">
          <form onSubmit={handleEmailSubmit}>
            <label>
              Enter New Email:
              <input
                type="text"
                id="new-email"
                placeholder="New Email"
                onChange={(e) => updateNewEmail(e.target.value)}
              />
            </label>
            <button type="submit">Change Email</button>
            {emailSuccessMessage && <p>{emailSuccessMessage}</p>}
            {emailErrorMessage && <p>{emailErrorMessage}</p>}
          </form>
        </div>

        {/* ---Passwords--- */}
        <div className="flex-col border border-red-500">
          <form onSubmit={handlePasswordSubmit}>
            <label>
              Enter Current Password:
              <input
                type="text"
                id="current-password"
                placeholder="Current Password"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
            <label>
              Enter New Password:
              <input
                type="text"
                id="new-password"
                placeholder="New Password"
                onChange={(e) => updateNewPassword(e.target.value)}
              />
            </label>
            <label>
              Retype New Password:
              <input
                type="text"
                id="retyped-new-password"
                placeholder="Retype New Password"
                onChange={(e) => setRetypedNewPassword(e.target.value)}
              />
            </label>
            <button type="submit">Update</button>
            {passwordSuccessMessage && <p>{passwordSuccessMessage}</p>}
            {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
          </form>
        </div>
        {/* --------------- */}
      </div>
    );
  }
};

export default Settings;