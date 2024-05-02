import React, { useRef, useState, useContext, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickAway } from 'react-use';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authProvider';
import './Navbar.css';
import { Menu } from 'lucide-react';
import { PencilLine, List, Sparkles, Sword } from 'lucide-preact';

const Sidenav = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className='sidenav'>
      <div className='mobile-navicon'>
        {!isOpen && <Menu size={36} color='white' onClick={() => setOpen(true)} />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
          >
          </motion.div>
        )}
      </AnimatePresence>
      {isOpen && (
        <Sidebar onClose={() => setOpen(false)}>
          <a href='/create' 
          className='flex justify-center items-center w-full py-6 px-2 border-b-2'
          >
          Create
          </a>
          <a href='/toprated' 
          className='flex justify-center items-center w-full py-6 px-2 border-b-2'
          >
          Top Rated
          </a>
          <a href='/challenging' 
          className='flex justify-center items-center w-full py-6 px-2 border-b-2'
          >
          Challenging
          </a>
          <a href='/allquizzes' 
          className='flex justify-center items-center w-full py-6 px-2'
          >
          All Quizzes
          </a>
        </Sidebar>
      )}
    </div>
  );
};


function Sidebar({ children, onClose }) {
  const [expanded, setExpanded] = useState(true);

  const { token, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleButtonClick = () => {
    setExpanded(false);
    setTimeout(() => {
      onClose();
    }, 600); // Adjust the delay as needed for the animation
  };

  return (
    <aside className='h-fit top-0 right-0 absolute'>
      <motion.nav
        initial={{ x: '100%' }}
        animate={{ x: expanded ? 0 : '100%' }} // Animate to '100%' on close
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className='h-full w-64 flex flex-col bg-white border-r shadow-sm rounded-l-lg'
      >
        <div className='flex px-3 py-6 border-b-2 justify-around items-center'>
          <button
            onClick={handleButtonClick}
            className='text-center'
          >
            <Menu size={36} color='black'/>
          </button>

          { token ? (
              <button className='mobile-login-btn' onClick={handleLogout}>Logout</button>
            ) : ( 
              <Link to='/login'>
                <button className='mobile-login-btn'>Login/Register</button>
              </Link>
          )}
        </div>

        <ul 
        className='flex flex-col justify-center items-start text-black'
        >
          {children}
        </ul>

      </motion.nav>
    </aside>
  );
}

export default Sidenav;
