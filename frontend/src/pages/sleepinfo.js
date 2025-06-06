import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Start from '../components/self-assess-start/start';
import './selfassess.css';
import HeadBar from '../components/headbar/headbar';


function SleepInfo(){
    return(
        <div>
            <HeadBar/>
            <h1>Sleep Info Page</h1>
        </div>
    );
}


export default SleepInfo;