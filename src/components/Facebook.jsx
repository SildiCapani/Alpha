import React from "react";
import { useEffect, useState } from "react";
import { client } from "../client";
import { Navigate, Router, useNavigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';





const Facebook = () => {
  const navigate = useNavigate();

  const responseFacebook = (response) => {
    localStorage.setItem('user', JSON.stringify(response.userID + response.email + response.name + response.picture.data.url ));
    console.log(response);
    const doc ={
      _id: response.userID,
      _type: 'user',
      email: response.email,
      userName: response.name,
      image: response.picture.data.url
    };
    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', { replace: true})
    } )
  }

const componentClicked = () => {
 console.log()
 }


    return<FacebookLogin
    appId="294533779410490"
    autoLoad={true}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook} />       
}

export default Facebook;