import { React, useState, useEffect } from 'react';
import axios from 'axios';
// import AuthContext from '../auth/AuthContext';
import { useAuth } from '../auth/authProvider';


const Settings = () => {
  const { userId } = useAuth();

  // new values the user wants to update
  const [newUsername, updateNewUsername] = useState(null);
  const [newPassword, updateNewPassword] = useState(null);
  const [newEmail, updateNewEmail] = useState(null);

  // for the passwords
  const [currentPassword, updateCurrentPassword] = useState(null);
  const [retypedNewPassword, updateRetypedNewPassword] = useState(null); // retyped password

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

  // these are for keeping track of what the user is trying to update
  const [usernameQuery, setUsernameQuery] = useState(false);
  const [emailQuery, setEmailQuery] = useState(false);
  const [passwordQuery, setPasswordQuery] = useState(false);


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
      console.log("User initialized -> ", loggedInUser);
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

      console.log("UQ -> ", usernameQuery);
      console.log("EQ -> ", emailQuery);
      console.log("PQ -> ", passwordQuery);
      // set success messages and reset state variables
      if (newUsername) {
        setUsernameSuccessMessage("Username changed");
        setEmailSuccessMessage(null);
        setPasswordSuccessMessage(null);
        document.getElementById("new-username").value = null;
        updateNewUsername(null);

      } else if (newEmail) {
        console.log("Email success...");
        setEmailSuccessMessage("Email changed");
        setUsernameSuccessMessage(null);
        setPasswordSuccessMessage(null);
        document.getElementById("new-email").value = null;
        updateNewEmail(null);

      } else if (newPassword) {
        setPasswordSuccessMessage("Password changed");
        setEmailSuccessMessage(null);
        setUsernameSuccessMessage(null);
        document.getElementById("current-password").value = null;
        document.getElementById("new-password").value = null;
        document.getElementById("retyped-new-password").value = null;
        updateCurrentPassword(null);
        updateNewPassword(null);
        updateRetypedNewPassword(null);
      }
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  // handlePasswordSubmit -> verifyCurrentPassword -> updateUserInfo
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Verifying passwords");
    if (currentPassword && newPassword && retypedNewPassword) {
      if (newPassword && retypedNewPassword) {
        if (retypedNewPassword !== newPassword) {
          console.log("Passwords do not match!");
          setPasswordErrorMessage(
            "newPassword and retypedNewPassword do not match"
          );
          setPasswordQuery(false);
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
      console.log("Current password -> ", currentPassword);
      const jsonPassword = { password: currentPassword };
      const res = await axios.post(
        `http://localhost:4000/api/users/checkPassword/${userId}`,
        jsonPassword
      );

      console.log("res status-> ", res.status);
      // status
      // 201 = wrong password
      // 200 = correct password
      if (res.status === 201) {
        setPasswordQuery(false);
        setPasswordErrorMessage("Incorrect current password entered");
      } else if (res.status === 200) {
        setPasswordQuery(true);
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
        console.log("Status ->", res.status);
        if (res.status === 201) {
          setUsernameQuery(false);
          setUsernameErrorMessage("Username already taken");
        } else {
          setUsernameErrorMessage(null);
          setUsernameQuery(true);
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
        console.log("Status ->", res.status);
        if (res.status === 201) {
          setEmailQuery(false);
          setEmailErrorMessage("Email already in use");
        } else {
            console.log("Email query...");
          setEmailQuery(true);
          console.log("Email query ->", emailQuery);
          setEmailErrorMessage(null);
          updateUserInfo();
        }
      } catch (err) {
        console.log(err);
      }
    }
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
                onChange={(e) => updateCurrentPassword(e.target.value)}
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
                onChange={(e) => updateRetypedNewPassword(e.target.value)}
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