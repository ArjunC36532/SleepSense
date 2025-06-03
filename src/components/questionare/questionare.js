import React, { useState } from 'react';
import './questionare.css';
import HeadBar from '../headbar/headbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Questionare() {
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [occupation, setOccupation] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState('');

    const navigate = useNavigate();

    async function handleClick() {
        try {
            const email = localStorage.getItem('email');
            console.log(email)
            if (!email) {
                alert('Please log in first');
                return;
            }

            const userResponse = await axios.post(`http://50.18.83.69/get-userid?email=${email}`);
            const user_id = userResponse.data.user_id;
            console.log(user_id)
        
            const data = {
                user_id: parseInt(user_id),
                age: age,
                gender: gender,
                occupation: occupation,
                weight: weight,
                height: height
            };

            console.log("Submit Clicked");
      
            // Upload Data
            const response = await axios.post("http://50.18.83.69/predict", data);
            console.log(response.data);
            
            // Route to appropriate diagnosment page
            navigate('/diagnose-page', {state: {result: response.data}});

        } catch (error) {
            console.error('Error uploading data', error);
        }


    }

    return (
        <div>
            <HeadBar />
            <div className="questionare-container">
                <h2 className="questionare-title">Diagnosis Questions</h2>
                <p>{result}</p>

                {/* 1. Age */}
                <div className="question-block">
                    <label className="question-label" htmlFor="age">1. What is your age?</label>
                    <input type="number" id="age" min="1" max="120" placeholder="Enter your age" className="age-input" onChange={(e) => setAge(e.target.value)} />
                </div>

                {/* 2. Gender */}
                <div className="question-block">
                    <label className="question-label">2. What is your gender?</label>
                    <select className="age-input" onChange={(e) => setGender(e.target.value)} defaultValue="">
                        <option value="" disabled>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                {/* 3. Occupation */}
                <div className="question-block">
                    <label className="question-label">3. Choose the occupation that best describes you</label>
                    <select className="age-input" onChange={(e) => setOccupation(e.target.value)} defaultValue="">
                        <option value="" disabled>Select your occupation</option>
                        <option value="manual_labor">Manual Labor</option>
                        <option value="office_worker">Office Worker</option>
                        <option value="retired">Retired</option>
                        <option value="student">Student</option>
                    </select>
                </div>

                {/* 4. Weight (kg) */}
                <div className="question-block">
                    <label className="question-label" htmlFor="weight">4. Enter your weight (kg)</label>
                    <input type="number" id="weight" placeholder="e.g. 70" className="age-input" onChange={(e) => setWeight(e.target.value)} />
                </div>

                {/* 5. Height (meters) */}
                <div className="question-block">
                    <label className="question-label" htmlFor="height">5. Enter your height (meters)</label>
                    <input type="number" id="height" step="0.01" placeholder="e.g. 1.75" className="age-input" onChange={(e) => setHeight(e.target.value)} />
                </div>

                <button className="submit-button" onClick={handleClick}>Submit</button>
            </div>
        </div>
    );
}

export default Questionare;
