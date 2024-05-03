import React from 'react';
import './Navbar.css';
import logo from '../../imgs/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navlink from './Navlink.jsx'
import { useAuth } from '../../auth/authProvider'
import { Navigate } from 'react-router-dom';

const Desknav = () => {
  const { token, logout } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');

  };

  return (
    <>
      <ul>
        <li>
          <Navlink className='' href='/create'>
            Create
          </Navlink>
        </li>
        <li>
          <Navlink className='' href='/allquizzes'>
            All Quizzes
          </Navlink>
        </li>
        { token ? (
          <>
            <li>
              <Navlink className='' href='/'>
                Settings
              </Navlink>
            </li>
            <li>
              <button className='login-btn' onClick={handleLogout}>Logout</button>
            </li>
          </>
          ) : ( 
            <li>
            <Link to='/login'>
              <button className='login-btn'>Login/Register</button>
            </Link>
          </li>
        )}
      </ul>
      </>
  )
}

export default Desknav