import React from 'react';
import './Footer.css';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const shouldDisplayFooter = () => {
    const excludePathnames = ['/login', '/signup'];
    return !excludePathnames.includes(location.pathname);
  };

  return shouldDisplayFooter() ? (
    <div className='footer container'>
      Footer
    </div>
  ) : null;
};

export default Footer;