import React, { useState } from 'react';
import './questionare.css';
import HeadBar from '../headbar/headbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Questionare() {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [occupation, setOccupation] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        
        // Validate age
        if (!age) {
            newErrors.age = 'Age is required';
        } else if (!Number.isInteger(Number(age))) {
            newErrors.age = 'Age must be a whole number';
        } else if (Number(age) < 1 || Number(age) > 120) {
            newErrors.age = 'Age must be between 1 and 120';
        }

        // Validate gender
        if (!gender) {
            newErrors.gender = 'Please select your gender';
        }

        // Validate occupation
        if (!occupation) {
            newErrors.occupation = 'Please select your occupation';
        }

        // Validate weight
        if (!weight) {
            newErrors.weight = 'Weight is required';
        } else if (Number(weight) <= 0) {
            newErrors.weight = 'Weight must be greater than 0';
        }

        // Validate height
        if (!height) {
            newErrors.height = 'Height is required';
        } else if (Number(height) <= 0) {
            newErrors.height = 'Height must be greater than 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleClick() {
        if (!validateForm()) {
            return;
        }

        try {
            const email = localStorage.getItem('email');
            if (!email) {
                alert('Please log in first');
                return;
            }

            const userResponse = await axios.post(`https://tplinux.taile388eb.ts.net/get-userid?email=${email}`);
            const user_id = userResponse.data.user_id;
        
            const data = {
                user_id: parseInt(user_id),
                age: parseInt(age),
                gender: gender,
                occupation: occupation,
                weight: weight,
                height: height
            };

            // Upload Data
            const response = await axios.post("https://tplinux.taile388eb.ts.net/predict", data);
            
            // Route to appropriate diagnosis page
            navigate('/diagnose-page', {state: {result: response.data}});

        } catch (error) {
            console.error('Error uploading data', error);
            alert('An error occurred while submitting your data. Please try again.');
        }
    }

    return (
        <div>
            <HeadBar />
            <div className="questionare-container">
                <h2 className="questionare-title">Diagnosis Questions</h2>

                {/* 1. Age */}
                <div className="question-block">
                    <label className="question-label" htmlFor="age">1. What is your age?</label>
                    <div className="input-wrapper">
                        <input 
                            type="number" 
                            id="age" 
                            min="1" 
                            max="120" 
                            placeholder="Enter your age" 
                            className={`age-input ${errors.age ? 'error' : ''}`}
                            value={age}
                            onChange={(e) => setAge(e.target.value)} 
                        />
                        {errors.age && <span className="error-message">{errors.age}</span>}
                    </div>
                </div>

                {/* 2. Gender */}
                <div className="question-block">
                    <label className="question-label">2. What is your gender?</label>
                    <div className="input-wrapper">
                        <select 
                            className={`age-input ${errors.gender ? 'error' : ''}`}
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && <span className="error-message">{errors.gender}</span>}
                    </div>
                </div>

                {/* 3. Occupation */}
                <div className="question-block">
                    <label className="question-label">3. Choose the occupation that best describes you</label>
                    <div className="input-wrapper">
                        <select 
                            className={`age-input ${errors.occupation ? 'error' : ''}`}
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                        >
                            <option value="">Select your occupation</option>
                            <option value="manual_labor">Manual Labor</option>
                            <option value="office_worker">Office Worker</option>
                            <option value="retired">Retired</option>
                            <option value="student">Student</option>
                        </select>
                        {errors.occupation && <span className="error-message">{errors.occupation}</span>}
                    </div>
                </div>

                {/* 4. Weight (kg) */}
                <div className="question-block">
                    <label className="question-label" htmlFor="weight">4. Enter your weight (kg)</label>
                    <div className="input-wrapper">
                        <input 
                            type="number" 
                            id="weight" 
                            placeholder="e.g. 70" 
                            className={`age-input ${errors.weight ? 'error' : ''}`}
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)} 
                        />
                        {errors.weight && <span className="error-message">{errors.weight}</span>}
                    </div>
                </div>

                {/* 5. Height (meters) */}
                <div className="question-block">
                    <label className="question-label" htmlFor="height">5. Enter your height (meters)</label>
                    <div className="input-wrapper">
                        <input 
                            type="number" 
                            id="height" 
                            step="0.01" 
                            placeholder="e.g. 1.75" 
                            className={`age-input ${errors.height ? 'error' : ''}`}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)} 
                        />
                        {errors.height && <span className="error-message">{errors.height}</span>}
                    </div>
                </div>

                <button className="submit-button" onClick={handleClick}>Submit</button>
            </div>
        </div>
    );
}

export default Questionare;
