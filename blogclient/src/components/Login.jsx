import React from 'react';
import '../styles/Login.css';
import { FcGoogle } from 'react-icons/fc';
import { RiLogoutCircleRFill } from 'react-icons/ri';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../config';
import { useState } from 'react';
import { useEffect } from 'react';

function Login() {

  const provider = new GoogleAuthProvider();
  const [user,setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
    });
  },[])
  
  const SignInHandler = async () =>{
    try{
      let res = await signInWithPopup(auth,provider);
      console.log(res);
    }
    catch(err){
      console.log(err);
    }
  }

  const LogOutHandler = async () =>{
    try{
      const res = await signOut(auth);
      console.log(res);
    }
    catch(err){
      console.log(err.message);
    }
  }
  
  return (
    <div className='LoginApp'>
         <div className="login-wrap">
         {
           user === null ? 
           ( 
             <>
             <FcGoogle size={40} className='login-google' onClick={SignInHandler} />
             <h4>Login with Google</h4>
             </>
           )
           :
           (  
             <>
             <h4>Email-id : {user.email} </h4>
             <div className='logout-wrap' onClick={LogOutHandler}>
             <RiLogoutCircleRFill size={60} color='black'  className='logout-class' />
             <h4>Logout</h4>
             </div>
             </>
           )
         }
         </div>
    </div>
  )
}

export default Login;