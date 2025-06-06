import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import {useNavigate} from 'react-router-dom';

function HomePage() {
    const [user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        });
    
        return unsubscribe;
      }, []);

    
      if(loading) {
        return(<h1>Loading...</h1>)
      }

      return(
        <div>
            {
            user? (
                navigate('/self-assess-page')
            ) : (
                navigate('/loginpage')
            )
        
        
        }
        </div>
      )





}

export default HomePage;