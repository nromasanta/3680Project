import React from 'react';
import './Navbar.css';
import logo from '../../imgs/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navlink from './Navlink.jsx'
import { useAuth } from '../../auth/authProvider'
import { Navigate } from 'react-router-dom';


const Navbar = () => {
  const { token, logout } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();
  const displayNavbar = () => {
    const excludePathnames = ['/login', '/signup'];
    return !excludePathnames.includes(location.pathname);
  };

  const darkBackground = () => {
    const darkBackgroundPathnames = ['/create', '/toprated', '/challenging', '/allquizzes'];
    return displayNavbar() && (darkBackgroundPathnames.includes(location.pathname) || location.pathname === '');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');

  };

  return displayNavbar() ? (
    <div className='navbar'>
      <nav className={`container ${darkBackground() ? 'dark-nav' : ''}`}>
      <Link to='/'>
        <img src={logo} alt='logo' className='logo'/>
      </Link>
      <ul>
        <li>
          <Navlink className='' href='/create'>
            Create
          </Navlink>
        </li>
        <li>
          <Navlink className='' href='/toprated'>
            Top Rated
          </Navlink>
        </li>
        <li>
          <Navlink className='' href='/challenging'>
            Challenging
          </Navlink>
        </li>
        <li>
          <Navlink className='' href='/allquizzes'>
            All Quizzes
          </Navlink>
        </li>
        { token ? (
        <li>
            <button className='login-btn' onClick={handleLogout}>Logout</button>
        </li>
        ) : ( 
          <li>
          <Link to='/login'>
            <button className='login-btn'>Login/Register</button>
          </Link>
        </li>
        )}

      </ul>
    </nav>
    </div>
  ) : null;
};

export default Navbar;
