import React, { Component, useState, setState, useEffect } from 'react'
import '../styles/style.css'
import Post from '../components/Pin';
import { Button } from '../components/Button';
import SideBar from './SideBar';
import ProfileBox from '../components/ProfileBox';
import NavBar from './NavBar';
import { AiFillCloseCircle } from "react-icons/ai";
import  Pins  from './Pins';
import { useNavigate } from 'react-router-dom';
import { userQuery } from "../utils/data";



  
 // Jetzt musst du einen InputText machen wo du dort einen Post eintippen kannst und den text nehmen, in einen Post Object
 // reinmachen <Post post={Text from InputText}/> und den Post Object in die Methode onAddTestPost übergeben


// Home muss ein React Component sein
// hier haben wir eine Klasse, dh wir können den Code etwas strukturieren

const Home = () => {
    const [toggleCategories, setToggleCatoggleCategories] = useState(false);

    // constructor wird aufgerufen wenn die Home Komponente geladen wird
 
      
    // render ist die methode die das View rendert/anzeigt
    
     
    const navigate = useNavigate()

    
  
 
    useEffect(() => {
        const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
        
        if(!user) navigate('/login')
    }, []);
        
  return( <div className='dbody'>
            <NavBar />

            <main>
            <div class='container'>
                <div  className='left'>

                <ProfileBox />

                <SideBar />          
                 <Button buttonName={'Add  Post'}/>
                 {/* <Button buttonName={'Delete All Test Posts'} /> */}
                </div> 

                <Pins />

            </div>
            </main>
            {toggleCategories && (
                <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                    <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                    <div className='absolute w-full flex justify-end items-center p-2'>
                        <AiFillCloseCircle fontSize={30} className='cursor-pointer' />
                    </div>
                </div>
                </div>
            )}
    </div> 
)
}

export default Home;
