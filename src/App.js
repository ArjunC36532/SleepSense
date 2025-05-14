import React, { useState, useEffect } from 'react';
import HomePage from './pages/homepage';
import MainPage from './pages/mainpage';
import LoginPage from './pages/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/signup';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<HomePage/>}/>
        <Route path = "/mainpage" element = {<MainPage/>}/>
        <Route path = "/loginpage" element = {<LoginPage/>}/>
        <Route path = "signuppage" element = {<SignupPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
