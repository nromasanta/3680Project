import React from 'react';
import './Navbar.css';
import logo from '../../imgs/logo.png';
import { Link, useLocation } from 'react-router-dom';
import Desknav from './Desknav.jsx';
import Sidenav from './Sidenav.jsx';

const Navbar = () => {
  const location = useLocation();

  const displayNavbar = () => {
    const excludePathnames = ['/login', '/signup'];
    return !excludePathnames.includes(location.pathname);
  };

  const darkBackground = () => {
    const darkBackgroundPathnames = ['/create', '/allquizzes'];
    return displayNavbar() && (darkBackgroundPathnames.includes(location.pathname) || location.pathname === '');
  };

  return displayNavbar() ? (
    <nav className={`navbar set-container ${darkBackground() ? 'dark-nav' : ''}`}>
      <a href='/'>
        <img src={logo} alt='logo' className='logo'/>
      </a>
      <div className='desktop-nav'>
        <Desknav />
      </div>
      <div className='mobile-nav'>
        <Sidenav />
      </div>
    </nav>
  ) : null;
};

export default Navbar;
