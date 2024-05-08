import { React, useState, useEffect } from 'react';
import axios from 'axios';
// import AuthContext from '../auth/AuthContext';
import { useAuth } from '../auth/authProvider';

const Settings = () => {
    const { userId } = useAuth();
    const [username, updateUsername] = useState(null);
    const [newPassword, updateNewPassword] = useState(null);
    const [currentPassword, updateCurrentPassword] = useState(null);
    const [newPasswordVerify, updateNewPassworVerify] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);

    const [email, updateEmail] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            console.log("Here");
            try {
                const res = await axios.get(
                    `http://localhost:4000/api/users/${userId}`
                );
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, []);

    const setNewInfo = async () => {
        console.log("Updating...");

        const user = {
            newUsername: username,
            newPassword: newPassword,
            currentPassword: currentPassword,
            newEmail: email,
            userId: userId,
        };

        try {
            const res = await axios.post(
                `http://localhost:4000/api/users/update`,
                user
            )
            console.log(res);

        } catch (err) {
            console.log(err);
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        console.log("Verifying passwords");
        if (newPasswordVerify !== newPassword) {
            console.log("Oh nooooooooooooooo")
        } else {
            console.log("Passwords match, go submit")
        }

    };

    const handleEmailOrUsernameSubmit = async (e) => {
        e.preventDefault();
        let newUsername = {username: username};
        try {
            const res = await axios.get(
                `http://localhost:4000/api/users/username`,
                newUsername
            );
            console.log(res);
        } catch (err) {
            console.log(err);
        }
        console.log("Verifying username");
    };

    return (
        <div className="temp-page container">
            {/* ---Other--- */}
            <div>
                <form onSubmit={handleEmailOrUsernameSubmit}>
                    <label>
                        Enter New Username:
                        <input type='text' placeholder='New Username' onChange={(e) => updateUsername(e.target.value)} />
                    </label>
                    <label>
                        Enter New Email:
                        <input type='text' placeholder='New Email' onChange={(e) => updateEmail(e.target.value)} />
                    </label>
                    <button type = "submit">Update</button>
                </form>
            </div>
            {/* ----------- */}

            {/* ---Passwords--- */}
            <div>
                <form onSubmit={handlePasswordSubmit}>
                    <label>
                        Enter Current Password:
                        <input type='text' placeholder='Current Password' onChange={(e) => updateCurrentPassword(e.target.value)} />
                    </label>
                    <label>
                        Enter New Password:
                        <input type='text' placeholder='New Password' onChange={(e) => updateNewPassword(e.target.value)} />
                    </label>
                    <label>
                        Retype New Password:
                        <input type='text' placeholder='Retype New Password' onChange={(e) => updateNewPassworVerify(e.target.value)} />
                    </label>
                    <button type = "submit">Update</button>
                    {errorMessage && <p>hiiiiiiiiiiiiiiiiiiii </p>}
                </form>
            </div>
            {/* --------------- */}

        </div>
    );
};

export default Settings;