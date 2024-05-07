import React, { Component } from "react";
import { useState, useCallback, useEffect } from "react";
import Hero from "../components/Hero/Hero.jsx";
import Featured from "../components/Featured/Featured.jsx";
import axios from "axios";
import purpose from '../imgs/purpose.png'
import story from '../imgs/story.png'

function Landing() {

    return (
        <div className="landing-page">
        <Hero />
        <div>
        {/*Body*/}
            <div className='about-body'>

            <div className='about-section-1 set-container'>
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

            <div className='about-section-2 set-container'>
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

            </div>
        </div>
        </div>
    );
}

export default Landing;
