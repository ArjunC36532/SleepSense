import React, { useState, useEffect } from 'react';
import '../components/headbar.css'
import '../main.css'
import { signOut } from 'firebase/auth';
import { auth } from '../pages/firebase'; 
import {useNavigate} from 'react-router-dom';


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
          <div className="section">Self-Assess</div>
          <div className="section">Sleep Info</div>
          <div className="section">Log Sleep</div>
          <div className="section" onClick={HandleSignOut}>Sign Out</div>
        </div>
      );
}

export default HeadBar;