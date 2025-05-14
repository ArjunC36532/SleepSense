import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut(auth);
    console.log('User signed out');
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
