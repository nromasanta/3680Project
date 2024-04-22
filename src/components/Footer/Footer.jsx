import React from 'react';
import './Footer.css';
import { useLocation, Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import logo from '../../imgs/logo.png';
import Navlink from '../Navbar/Navlink.jsx'

const Footer = () => {
  const location = useLocation();

  const shouldDisplayFooter = () => {
    const excludePathnames = ['/login', '/signup'];
    return !excludePathnames.includes(location.pathname);
  };

  return shouldDisplayFooter() ? (
    <div className='footer container'>
      <div className='footer-section'>
        <div className='footer-links'>
          <div className='footer-links-div'>
            <Navlink href='/'>
              <p className='footer-link'>
                Terms & Conditions
              </p>
            </Navlink>
            <Navlink href='/'>
              <p className='footer-link'>
                Privacy Policy
              </p>
            </Navlink>
            <Navlink href='https://github.com/nromasanta/3680Project'>
              <p className='footer-link'>
                Source Code
              </p>
            </Navlink>
            <Navlink href='/about'>
              <p className='footer-link'>
                About
              </p>
            </Navlink>
          </div>
          <div>
            <img src={logo} className='footer-logo'/>
          </div>
        </div>

        <hr></hr>

        <div className='footer-lower'>
          <div className='footer-copyright'>
            <p>
              @{new Date().getFullYear()} QuizCraft. All Rights Reserved.
            </p>
          </div>
          <div className='footer-lower-links'>
            <div className='social-icons'>
              <Link to='/'>
                <IconContext.Provider value={{ color: '#fff', className: 'linkedIn' }}>
                  <FaLinkedin size={42}/>
                </IconContext.Provider>
              </Link>
              <Link 
              to='https://github.com/nromasanta/3680Project'
              >
                <IconContext.Provider value={{ color: '#fff', className: 'gitHub' }}>
                  <FaGithub size={42}/>
                </IconContext.Provider>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Footer;