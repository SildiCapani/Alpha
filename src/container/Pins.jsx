import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { Feed, CreatePin, PinDetail, Search, NavBar, UserProfile } from "../components";
import { Courses } from '../components/Courses'
import '../styles/style.css';
import { FaSistrix } from 'react-icons/fa';
import { userQuery } from "../utils/data";
import { client } from "../client";






const Pins = ({ }) => {
    const [searchTerm, setSearchTerm ] = useState('');
    const navigate = useNavigate()

    const [user, setUser] = useState();

    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  
    useEffect(() => {
      const query = userQuery(userInfo?.googleId);
  
      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    }, []);

    
    return (

<div class="middle"> 

    <div className='show'>
    {/* <form action="create-pin" class="create-post">
        <div class="profile-photo">
            <img src={ require("../images/Logo.png")} style={{color: 'var(--color-dark)'}} />
        </div>
        <input type="text" placeholder="Share you Information" id="create-post"/>
        <input type="submit" value="Post" style={{color: 'var(--color-dark)'}} class="btn btn-primary"/>
    </form>*/}</div> 
    <div className='search' >
    <form class="create-post">
        <button type="submit"><FaSistrix className='i'/></button>
        <input type="text" placeholder="Search ..." onFocus={() => navigate('/search')}/>
        
    </form></div>
    
 <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/categry/category:id" element={<Feed />} />
        <Route path="/explore" element={<Feed />} />
        <Route path="/pin-detail/:pinId" element={<PinDetail user={user} />} />
        <Route path="/create-pin" element={<CreatePin user={user} />} />
        <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        <Route path="/courses" element={<Courses />} />
        <Route path='/user-profile/:userId' element={<UserProfile />}/>
    </Routes>

        
    <div class="feeds">
{/**hier PostList muss vom State kommen, state.PostList, schau wie du state verwenden kannst ,
* component state funktioniert nur bei React Components
*/}

      {/*   {PostList.map((post) => {
            return post;
        })} */}

        {/** hier musst du noch this.state.darkTheme übergeben und in Post component dann style wechseln */}
          
    </div>
</div>
    )
}
export default Pins;