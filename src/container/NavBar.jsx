import React, {useState} from "react";
import "../styles/style.css";
import { FaSistrix } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import ReactGoogleLogin from '../components/Google';

let loginButtonTitle = 'Log out';


const NavBar = ({ searchTerm, setSearchTerm, user }) => {

    const navigate = useNavigate();

    return<nav>
            <div class="container">
        
                <h2 class="logo">
                    <a href="/">
                    <img src={ require("../images/logo-1.png")}/></a>
                </h2>
                <h2 class="logo"><b>ALLPHA</b></h2>
            
                <div class="search-bar">
                    <button type="submit"><FaSistrix className='i'/></button>
                    <input  type="search" onChange={(e) => (e.target.value)}
                    value={searchTerm}
                    onFocus={() => navigate('/search')}
                    placeholder="Search here ..."/>
                </div>
            
                <div class="create" id="create">
                    {/*  */}
                    <Link
                    to={'create-pin'}><label class="btn btn-primary">Shto</label></Link>
                    
                </div>
                {/** ich gehe jetzt, viel Spaß dir!  Danke, hoffe hat dir etwas gebracht */}
                 <Link class='btn btn-primary' to={"/Login"}> <a >{user ? 'Log in' : 'Log out' }</a></Link>    
                 
            </div>
            <script src="./CreatePost.jsx"></script> </nav>
}
export default NavBar;