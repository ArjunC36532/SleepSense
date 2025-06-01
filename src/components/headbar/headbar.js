import React, { useState, useEffect } from 'react';
import './headbar.css'
import { signOut } from 'firebase/auth';
import { auth } from '../../pages/firebase'; 
import {useNavigate, Link} from 'react-router-dom';


function HeadBar(){
    const navigate = useNavigate();


    const HandleSignOut = async() => {
        try{
            await signOut(auth);
            navigate('/');
        }
        catch(error){
            console.log("Error Signing Out");
        }
    }

    return (
        <div className="top-bar">
            <Link to="/self-assess-page" className="section">Self-Assess</Link>
            <Link to="/log-sleep-page" className="section">Log Sleep</Link>
            <div className="section" onClick={HandleSignOut}>Sign Out</div>
        </div>
    );
}

export default HeadBar;