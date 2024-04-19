import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { IconContext } from 'react-icons'

import AllQuizzes from './pages/AllQuizzes.jsx'
import Create from './pages/Create.jsx'
import Challenging from './pages/Challenging.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import TopRated from './pages/TopRated.jsx'

const App = () => {
  return (
    <IconContext.Provider>
      <div className='app'>
      <BrowserRouter>
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/create" element={<Create />}/>
            <Route path="/challenging" element={<Challenging />}/>
            <Route path="/allquizzes" element={<AllQuizzes />}/>
            <Route path="/toprated" element={<TopRated />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </IconContext.Provider>
  )
}

export default App
