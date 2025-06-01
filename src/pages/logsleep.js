import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Start from '../components/self-assess-start/start';
import './selfassess.css';
import HeadBar from '../components/headbar/headbar';
import './logsleep.css';
import SleepDurationLineChart from '../line-chart/LineChart';
import axios from 'axios';
import LineChart from '../line-chart/LineChart';

function LogSleep() {
    const [sleepHours, setSleepHours] = useState('');
    const [sleepQuality, setSleepQuality] = useState('');
    const [date, setDate] = useState('');
    const [physicalActivity, setPhysicalActivity] = useState('');
    const [stressLevel, setStressLevel] = useState('');
    const [totalSteps, setTotalSteps] = useState('');
    const [timeFilter, setTimeFilter] = useState('week')

    const getDayOfWeek = (date) => {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dateObj = new Date(date + 'T12:00:00Z');
        console.log(days[dateObj.getDay()])
        return days[dateObj.getDay()];
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const email = localStorage.getItem('email');
            if (!email) {
                alert('Please log in first');
                return;
            }

            const userResponse = await axios.post(`http://127.0.0.1:8000/get-userid?email=${email}`);
            const user_id = userResponse.data.user_id;

            const data = {
                user_id: parseInt(user_id),
                date: date,
                hours_of_sleep: parseFloat(sleepHours),
                sleep_quality: parseInt(sleepQuality),
                physical_activity_minutes: parseInt(physicalActivity),
                stress_level: parseInt(stressLevel),
                total_steps: parseInt(totalSteps),
                day: getDayOfWeek(date),
            }

            console.log('Sending data to server:', data); // Debug log

            const response = await axios.post(`http://127.0.0.1:8000/add-entry`, data);
            
            if (response.data.status === "success") {
                setDate('');
                setSleepHours('');
                setSleepQuality('');
                setPhysicalActivity('');
                setStressLevel('');
                setTotalSteps('');
                alert('Sleep data logged successfully!');
            }
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message); // Debug log
            if (error.response?.status === 404) {
                alert('User not found. Please check your login.');
            } else {
                alert('Failed to submit sleep data. Please try again.');
            }
        }
    }

    return (
        <div>
            <HeadBar />
            <div className="log-sleep-container">
                <div className="log-sleep-form">
                    <h2>Log Your Sleep</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="date">Today's Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sleepHours">Sleep Duration (hours)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="sleepHours"
                                value={sleepHours}
                                onChange={(e) => setSleepHours(e.target.value)}
                                min="0"
                                max="24"
                                step="0.1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sleepQuality">Sleep Quality (1-10)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="sleepQuality"
                                value={sleepQuality}
                                onChange={(e) => setSleepQuality(e.target.value)}
                                min="1"
                                max="10"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="physicalActivity">Yesterday's Total Physical Activity (minutes)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="physicalActivity"
                                value={physicalActivity}
                                onChange={(e) => setPhysicalActivity(e.target.value)}
                                min="0"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="stressLevel">Yesterday's Stress Level (1-10)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="stressLevel"
                                value={stressLevel}
                                onChange={(e) => setStressLevel(e.target.value)}
                                min="1"
                                max="10"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="totalSteps">Yesterday's Total Steps</label>
                            <input
                                type="number"
                                className="form-control"
                                id="totalSteps"
                                value={totalSteps}
                                onChange={(e) => setTotalSteps(e.target.value)}
                                min="0"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Log Sleep</button>
                    </form>
                </div>

                <div className="sleep-charts">
                    <h2>Sleep Analytics</h2>
                    <div className="chart-filters">
                        <button className={`time-filter ${timeFilter === 'week' ? 'active' : ''}`} onClick={() => setTimeFilter('week')}>Week</button>
                        <button className={`time-filter ${timeFilter === 'last_week' ? 'active' : ''}`} onClick={() => setTimeFilter('last_week')}>Last Week</button>
                        <button className={`time-filter ${timeFilter === 'month' ? 'active' : ''}`} onClick={() => setTimeFilter('month')}>Month</button>
                    </div>
                    <div className="charts-container">
                        {/* Placeholder for sleep hours chart */}
                        <div className="chart-box">
                            <h3>Sleep Duration</h3>
                            <div className="chart-placeholder">
                                <LineChart timeFilter={timeFilter} dataKey="sleepHours" />
                            </div>
                        </div>
                        
                        {/* Placeholder for sleep quality chart */}
                        <div className="chart-box">
                            <h3>Sleep Quality</h3>
                            <div className="chart-placeholder">
                                <LineChart timeFilter={timeFilter} dataKey="sleepQuality" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogSleep;