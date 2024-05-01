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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed right-0 shadow-4xl h-1/2 top-[3.5rem] bg-white border-b border-b-white/20'
          >
            <ul className='grid gap-2 w-full'>
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 / 10,
                    }}
                    className='w-full p-[0.08rem] m-0 rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700'
                  >
                    <a
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        'flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950'
                      }
                    >
                      <span className='flex gap-1 text-lg'>Home</span>
                    </a>
                  </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Sidenav