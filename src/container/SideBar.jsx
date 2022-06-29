import React, { useState } from "react";
import "../styles/style.css"
import { BiHome } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { BsBell, BsStack, BsBookFill } from "react-icons/bs";
import { FiSettings, } from "react-icons/fi";
import { NavLink, Link } from 'react-router-dom';




const isNotActiveStyle = 'menu-item';
const isActiveStyle = 'menu-item active';

const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
};
const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
};
const storedTheme = localStorage.getItem("theme");
const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
  storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
}
const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setDark();
    } else {
      setLight();
    }
  };

  const categories = [
    { name: 'Matematik'},
    { name: 'Gjuh'},
    { name: 'Kimi'},
    { name: 'Biollogji'},
    { name: 'Informatik'},
    { name: 'Ekonomi'},
    { name: 'Other'}
  ];

  function showDiv() {
    document.getElementById('category').style.display = "flex";
 }

const SideBar = ({closeToggle, user}) => {

    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
      }

 // du musst eigentlich für jedes UI element eine komponente machen, die einen prop darkTheme akzeptiert (so wie Sidebar), und 
 // in der komponente das styling setzen mit this.props.darkTheme ? darkStyle : lightStyle
// darkTheme wird von Mutter componente zu allen children überreicht 
    return<div className="sidebar">

        <NavLink 
          to="/"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
          onClick={handleCloseSidebar}
        > <BiHome className='i'/>
            <h3>Home</h3></NavLink>

        <NavLink 
          to="/explore"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
          onClick={handleCloseSidebar}
        ><MdOutlineExplore className='i'/>
            <h3>Explore</h3></NavLink>

        <NavLink 
          to="/njoftime"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
          onClick={handleCloseSidebar}
        ><BsBell className='i'/>
            <h3>Njoftime</h3> </NavLink>

        <NavLink 
          to="/courses"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
          onClick={handleCloseSidebar}
        ><BsBookFill className='i'/>
            <h3>Courses</h3> </NavLink>

        <NavLink 
          to="/category"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
          onClick={handleCloseSidebar}
        > <BsStack className='i'/>
            <h3>Categories</h3>
            </NavLink>

        {categories.slice(0, categories.length -1).map((category) => (
          <NavLink
          to={`/category/${category.name}`}
          className='menu-item category'
          id="category"
          >
            {category.name}
          </NavLink>
        ))}

        <div className="dark">
            <span>☀️</span>
            <label className="toggle-theme" htmlFor="checkbox">
            <input
            type="checkbox"
            id="checkbox"
            onChange={toggleTheme}
            defaultChecked={defaultDark}
            />
        <div className="slider round"></div>
        </label>
            <span>🌒</span>
        </div>        
       
        <NavLink 
          to="/settings"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
          onClick={handleCloseSidebar}
        > <FiSettings className='i'/>
            <h3>Settings</h3></NavLink>

    </div>

}
 export default SideBar;
