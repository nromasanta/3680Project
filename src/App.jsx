import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {

  const [userArray, setUserArray] = useState([]);
  const [userSingle, setUserSingle] = useState();
  const [loading, setLoading] = useState(true); // don't render data when we haven't fetched it yet

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/users');
        const jsonResponse = await res.json();
        console.log("Fetch all users (returns array) -->", jsonResponse);

        const res2 = await fetch('http://localhost:4000/api/users/6621d46a2fcdfddf28e40e98');
        const jsonResponse2 = await res2.json();
        console.log("Fetch single user -->", jsonResponse2);

        // response.ok means status is in range of 200-299
        if (res.ok) {
          setUserArray(jsonResponse);
        }
        if (res2.ok) {
          setUserSingle(jsonResponse2);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
      setLoading(false); 
    };

    fetchUser();
  }, []);

if (!loading) {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Users:</h1>
      <div className="card">
        <p>
          Array at index 0 when fetching all users: {userArray[0].username} and {userArray[1].username}
        </p>
        <p>
          Result from fetching single user: {userSingle.username}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
} else {
  return (<p>Loading...</p>)
}

}

export default App
