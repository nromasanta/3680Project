import { React, useState, useEffect } from 'react';
import axios from 'axios';
// import AuthContext from '../auth/AuthContext';
import { useAuth } from '../auth/authProvider';

const Settings = () => {
    const { userId } = useAuth();
    const [ username, updateUsername] = useState(null);
    const [ password, updatePassword] = useState(null);
    const [ email, updateEmail] = useState(null);

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
            newPassword: password,
            newEmail: email,
            userId: userId,
        };
        try {
            const res = await axios.post(
                `http://localhost:4000/api/users/update`,
                user
            )
            console.log(res);
        } catch(err) {
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="temp-page container">
            <form onSubmit={handleSubmit}>
                <label>
                    Enter New Username:
                    <input type='text' placeholder='New Username' onChange={(e) => updateUsername(e.target.value)}/>
                </label>
                <label>
                    Enter New Email:
                    <input type='text' placeholder='New Email' onChange={(e) => updateEmail(e.target.value)}/>
                </label>
                <label>
                    Enter New Password:
                    <input type='text' placeholder='New Password' onChange={(e) => updatePassword(e.target.value)}/>
                </label>
                
            </form>
            <button onClick={setNewInfo}>Update</button>
        </div>
    );};

export default Settings;