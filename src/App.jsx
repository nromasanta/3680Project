import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/routes/ProtectedRoute.jsx'
import { IconContext } from 'react-icons'

import AllQuizzes from './pages/AllQuizzes.jsx'
import Create from './pages/Create.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Quiz from './pages/Quiz.jsx'
import Settings from './pages/UserSettings.jsx'
import QuizResults from './pages/QuizResults.jsx'

const App = () => {
  return (
    <IconContext.Provider>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <div className="set-pages">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/create" element={<Create />} />
                <Route path="/quiz/:id" element ={<Quiz />} />
                <Route path="/settings/:id" element ={<Settings />} />
                <Route path="/quiz/result/:id" element ={<QuizResults />} />
              </Route>
              <Route path="/allquizzes" element={<AllQuizzes />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </IconContext.Provider>
  );
};

export default App;
