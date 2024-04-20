import React, { useEffect, useState } from 'react';
import './Navbar.css';
import placeholder from '../../imgs/placeholder.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 600 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const displayNavbar = () => {
    const excludePathnames = ['/login', '/signup'];
    return !excludePathnames.includes(location.pathname);
  };

  const darkBackground = () => {
    const darkBackgroundPathnames = ['/create', '/toprated', '/challenging', '/allquizzes'];
    return displayNavbar() && (darkBackgroundPathnames.includes(location.pathname) || location.pathname === '');
  };

  return displayNavbar() ? (
    <nav className={`container ${sticky || darkBackground() ? 'dark-nav' : ''}`}>
      <a href='/'>
        <img src={placeholder} alt="placeholder" className="logo"/>
      </a>
      <ul>
        <li>
          <Link to='/create'>Create</Link>
        </li>
        <li>
          <Link to='/toprated'>Top Rated</Link>
        </li>
        <li>
          <Link to='/challenging'>Challenging</Link>
        </li>
        <li>
          <Link to='/allquizzes'>All Quizzes</Link>
        </li>
        <li>
          <Link to='/login'>
            <button className="btn">Login/Register</button>
          </Link>
        </li>
      </ul>
    </nav>
  ) : null;
};

export default Navbar;
