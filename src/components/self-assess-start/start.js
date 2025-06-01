import React from 'react';
import { useNavigate } from 'react-router-dom';
import './start.css';

const SelfAssessStart = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/questionare-page');
    };

    return (
        <div className="self-assess-container">
            <div className="self-assess-box">
                <div className="logo-container">
                    <h1 className="logo">SleepSense</h1>
                    <p className="tagline">Track. Analyze. Improve Your Sleep.</p>
                </div>
                <div className="self-assess-content">
                    <h2 className="self-assess-title">Sleep Assessment</h2>
                    <p className="self-assess-description">
                        Take our comprehensive sleep assessment to understand your sleep patterns better. 
                        We'll analyze your responses and provide personalized insights to help improve your sleep quality.
                    </p>
                    <button className="start-button" onClick={handleStart}>
                        Start Assessment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelfAssessStart;
