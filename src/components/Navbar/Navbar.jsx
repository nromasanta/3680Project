import React from 'react'
import './Navbar.css'
import placeholder from '../../imgs/placeholder.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="container">
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