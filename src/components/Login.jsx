import React from 'react';
import GoogleLogin from 'react-google-login';
import { Navigate, Router, useNavigate } from 'react-router-dom';
import { FcGoogle, FcProcess } from 'react-icons/fc';
import '../styles/login.css'
import Facebook from './Facebook';
import ReactGoogleLogin from '../components/Google';





const Login = () => {

  return (
      <div className='body flex justify-start flex-col h-screen'>
        <div className='s'>
      <div class="main ">
        

          <div class='absolute flex flex-col justify-center items-center'>
         
          <ReactGoogleLogin />
          <div className='ss'>
          
          </div>
        </div>
        </div>   
    </div>
    </div>
  )}

  

export default Login;
