import React from 'react'
import '../styles/About.css'
import placeholder from '../imgs/placeholder.jpg'
import purpose from '../imgs/purpose.png'
import story from '../imgs/story.png'

const About = () => {
  return (
    <div className='about-page'>

      {/*Hero*/}
      <div className='about-hero set-container'>
        <div className='about-hero-left'>
          <div className='about-hero-text'>
              <h1>Next Level Fanaticism</h1>
              <p>
                Find your place among many active users to share and express your love for content alike!
              </p>
          </div>
        </div>
        <div className='about-hero-right'>
          <img className='about-hero-image' src={placeholder} />
        </div>
      </div>
      {/*------------------------------------------------------------------------*/}

      {/*Body*/}
      <div className='about-body'>

      <div className='about-section-2 container'>
          <div className='about-2-content'>
            <div className='about-2-left'>
              <img src={story} alt='placeholder' className='about-image'/>
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
              <h3>Our Purpose</h3>
              <p>
                QuizCraft is about giving users the power to interact with and create content for fans like themselves.
                We want to make bridging the gap between content and fandoms easier.
                Because fans want fans to share their love with everyone.
              </p>
            </div>
            <div className='about-1-right'>
              <img src={purpose} alt='purpose' className='about-image'/>
            </div>
          </div>
        </div>

      </div>
      {/*------------------------------------------------------------------------*/}

    </div>
  )
}

export default About