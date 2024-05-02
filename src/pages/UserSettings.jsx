import { React, useState, useEffect } from 'react';
import axios from 'axios';
// import AuthContext from '../auth/AuthContext';
import { useAuth } from '../auth/authProvider';

const Settings = () => {
    const { token, userId } = useAuth();
    const [ username, updateUsername] = useState();
    const [ password, updatePassword] = useState();
    const [ user, setUser] = useState({username: null, password: null, userId: null});

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
        
        setUser({
            username: username,
            password: password,
            userId: userId,
        });
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
                    <input type='text' onChange={(e) => updateUsername(e.target.value)}/>
                </label>
                <label>
                    Enter New Password:
                    <input type='text' onChange={(e) => updatePassword(e.target.value)}/>
                </label>
            </form>
            <button onClick={setNewInfo}>Update</button>
        </div>
    );};

export default Settings;