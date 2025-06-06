import React, { useState, useEffect } from 'react';
import SleepAnea from '../components/diagnosis/SleepApnea';
import Insomnia from '../components/diagnosis/Insomnia';
import NoDisorder from '../components/diagnosis/NoDisorder';
import Loading from '../components/loading/LoadingAnimation';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Diagnose() {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const result = location.state.result;

    useEffect(() => {
        // Show loading animation for 3 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="main-content">
            {result === 'Sleep Apnea' ? (
                <SleepAnea />
            ) : result === 'Insomnia' ? (
                <Insomnia />
            ) : (
                <NoDisorder />
            )}
        </div>
    );
}

export default Diagnose;