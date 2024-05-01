import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
// source: https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [userId, setUserId_] = useState(localStorage.getItem("userId"));


  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setUserId = (newUser) => {
    setUserId_(newUser);
  };

  const logout = () => {
    setToken_(null);
    setUserId_(null);
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
      localStorage.setItem('userId',userId);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  }, [token, userId]);


  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userId,
      setUserId,
      logout
    }),
    [token, userId]
  );


  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;