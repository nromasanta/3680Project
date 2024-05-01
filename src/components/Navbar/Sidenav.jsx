import React, {useRef, useState} from 'react'
import { Squash as Hamburger} from 'hamburger-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import './Navbar.css';
import logo from '../../imgs/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navlink from './Navlink.jsx'
import { useAuth } from '../../auth/authProvider'
import { Navigate } from 'react-router-dom';

const Sidenav = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  const { token, logout } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');

  };

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className='sidenav'>
      { token ? (
          <button className='login-btn' onClick={handleLogout}>Logout</button>
        ) : ( 
          <Link to='/login'>
            <button className='login-btn'>Login/Register</button>
          </Link>
      )}
      
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      {isOpen && (
        <div>
          Home
        </div>
      )}

    </div>
  );
};

export default Sidenav