import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Signup successful!');
    } catch (err) {
      setError(err.message);  // You can customize the error messages if you want
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {message && <p style={{color: 'green'}}>{message}</p>}
    </div>
  );
};

export default SignupPage;
