import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import axios from 'axios';
import './signup.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Create user in Firebase
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            
            // Add user to backend database
            try {
                const response = await axios.post('https://sleepsense.onrender.com/add-user', {
                    user_name: formData.email
                });
                console.log(response.data);
                navigate('/');
            } catch (backendError) {
                console.error('Error adding user to database:', backendError);
                setError('Account created but there was an error setting up your profile. Please try logging in.');
            }
        } catch (err) {
            // Get the specific error message from Firebase
            const errorMessage = err.message;
            setError(errorMessage);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="logo-container">
                    <h1 className="logo">SleepSense</h1>
                    <p className="tagline">Track. Analyze. Improve Your Sleep.</p>
                </div>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>Create Account</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                    <button type="button" className="login-button" onClick={() => navigate('/')}>
                        Already have an account? Log in
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
