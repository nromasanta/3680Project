import React, { useEffect, useState } from 'react'
import './Navbar.css'
import placeholder from '../../imgs/placeholder.png'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', ()=> {
      window.scrollY > 600 ? setSticky(true) : setSticky(false);
    })
  }, [])

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <a href='/'>
        <img src={placeholder} alt="placeholder" className="logo"/>
      </a>
      <ul>
        <li>
          <a href='/create'>
            Create
          </a>
        </li>
        <li>
          <a href='/toprated'>
            Top Rated
          </a>
        </li>
        <li>
          <a href='/challenging'>
            Challenging
          </a>
        </li>
        <li>
          <a href='/allquizzes'>
            All Quizzes
          </a>
        </li>
        <li>
          <a href='/login'>
            <button className="btn">
                Login/Register
            </button>
          </a>
        </li>
      </ul>

    </nav>
  )
}

export default Navbar