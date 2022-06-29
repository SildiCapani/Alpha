import React from "react";
import GoogleLogin from "react-google-login";
import '../styles/login.css'
import { Navigate, Router, useNavigate } from 'react-router-dom';
import { FcGoogle, FcProcess } from 'react-icons/fc';
import { client } from "../client";


const ReactGoogleLogin = () => {
    const navigate = useNavigate();

  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    console.log(response)
    const {name, googleId, email, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      email: email,
      image: imageUrl
    } 
    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', { replace: true})
    } )
}

    
   

return <GoogleLogin 
clientId={ process.env.REACT_APP_GOOGLE_API_TOKEN}
render={(renderProps) => (
  
  <button type='button' 
  className='un bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
  onClick={renderProps.onClick}
  disabled={renderProps.disabled}
  > 
    <FcGoogle className='mr-4' />
  Sing in with Google</button>
)}
onSuccess={responseGoogle}
onFailure={responseGoogle}
cookiePolicy="single_host_origin"
/>


}

export default ReactGoogleLogin;