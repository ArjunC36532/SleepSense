import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Start from '../components/self-assess-start/start';
import './selfassess.css';
import HeadBar from '../components/headbar/headbar';

function SelfAssess() {
    return (
        <div>
            <HeadBar/>
            <div class = "self-assess-wrapper">
                <p className="instruction-text">
                        This questionnaire will ask you a few simple questions about your sleep, health, and daily habits.
                        Your answers will be processed by a machine learning model along with all the data you've input into your sleep log to help identify any signs of potential sleep issues.
                        It's quick, private, and designed to support your well-being.</p>
                <Start/>
            </div>
        </div>
    );
}

export default SelfAssess;
