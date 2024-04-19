import React, { Component } from 'react';
import { useState, useCallback, useEffect } from 'react';
import Hero from '../components/Hero/Hero.jsx'
import About from '../components/About/About.jsx'

function Landing() {
    return (
        <div className='landing-page'>
            <Hero />
            <div className='container'>
                <About/>
            </div>
        </div>
    );
}

export default Landing;