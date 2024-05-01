import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidenav from './components/Navbar/Sidenav.jsx'
import Footer from './components/Footer/Footer.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/routes/ProtectedRoute.jsx'
import { IconContext } from 'react-icons'

import AllQuizzes from './pages/AllQuizzes.jsx'
import Create from './pages/Create.jsx'
import Challenging from './pages/Challenging.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import TopRated from './pages/TopRated.jsx'
import About from './pages/About.jsx'

const App = () => {
  return (
    <IconContext.Provider>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/create" element={<Create />} />
              </Route>
              <Route path="/challenging" element={<Challenging />} />
              <Route path="/allquizzes" element={<AllQuizzes />} />
              <Route path="/toprated" element={<TopRated />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </IconContext.Provider>
  );
};

export default App;
