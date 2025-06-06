import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('email', email);
            navigate("/self-assess-page");
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    const handleClick = () => {
        navigate('/signuppage');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo-container">
                    <h1 className="logo">SleepSense</h1>
                    <p className="tagline">Log your sleep. Get personalized insights. The more you log, the smarter your predictions.</p>
                </div>
                <form onSubmit={handleLogin} className="login-form">
                    <h2>Welcome Back</h2>
                    <div className="input-group">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    <button onClick={handleClick} type="button" className="signup-button">Create Account</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
