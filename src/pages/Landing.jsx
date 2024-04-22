import React, { Component } from 'react';
import { useState, useCallback, useEffect } from 'react';
import Hero from '../components/Hero/Hero.jsx'
import Featured from '../components/Featured/Featured.jsx'

function Landing() {
    return (
        <div className='landing-page'>
            <Hero />
            <div className='container'>
                <Featured/>
            </div>
        </div>
    );
}

export default Landing;