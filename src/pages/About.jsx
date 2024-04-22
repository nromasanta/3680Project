import React from 'react'
import '../styles/About.css'
import placeholder from '../imgs/placeholder.jpg'

const About = () => {
  return (
    <div className='about-page'>

      {/*Hero*/}
      <div className='about-hero container'>
        <div className='about-hero-left'>
          <div className='about-hero-text'>
              <h1>New Hero Text.</h1>
              <p>Bottom Text.</p>
          </div>
        </div>
        <div className='about-hero-right'>
        </div>
      </div>
      {/*------------------------------------------------------------------------*/}

      {/*Body*/}
      <div className='about-body'>

        <div className='about-section-1 container'>
          <div className='about-1-content'>
            <div className='about-1-left'>
              <h3>Our Purpose</h3>
              <p>
                QuizCraft is about giving users the power to interact with and create content for fans like themselves.
                We want to make bridging the gap between content and fandoms easier.
                Because fans want fans to share their love with everyone.
              </p>
            </div>
            <div className='about-1-right'>
              <img src={placeholder} alt='placeholder' className='about-image'/>
            </div>
          </div>
        </div>
  
        <div className='about-section-2 container'>
          <div className='about-2-content'>
            <div className='about-2-left'>
              <img src={placeholder} alt='placeholder' className='about-image'/>
            </div>
            <div className='about-2-right'>
              <h3>Our Story</h3>
                <p>
                  QuizCraft started as a project for our Computer Science Web Development course.
                  However, it became much more than that. QuizCraft is our passion project
                  as we work toward advancing our respective careers.
                </p>
            </div>
          </div>
        </div>
  
        <div className='about-section-1 container'>
          <div className='about-1-content'>
            <div className='about-1-left'>
              <h3>Third Section If Needed</h3>
              <p>
                Bottom Text
              </p>
            </div>
            <div className='about-1-right'>
              <img src={placeholder} alt='placeholder' className='about-image'/>
            </div>
          </div>
        </div>
  

      </div>
      {/*------------------------------------------------------------------------*/}

    </div>
  )
}

export default About