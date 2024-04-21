import React from 'react';
import './Footer.css';
import { useLocation, Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import placeholder from '../../imgs/placeholder.png';

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
            <Link to='/'>
              <p className='footer-link'>
                Terms & Conditions
              </p>
            </Link>
            <Link to='/' className='footer-link'>
              <p>
                Privacy Policy
              </p>
            </Link>
            <Link 
              to='https://github.com/nromasanta/3680Project' 
              className='footer-link'>
              <p>
                Source Code
              </p>
            </Link>
            <Link to='/' className='footer-link'>
              <p>
                Contact Us
              </p>
            </Link>
          </div>
          <div>
            <img src={placeholder} className='footer-logo'/>
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