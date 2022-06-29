import React from "react";
import "../styles/style.css";
import {client} from "../client"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { userQuery } from "../utils/data";
import { useState } from "react";
import { fetchUser } from "../utils/fetchUser";
import { useParams, useNavigate } from 'react-router-dom';




const ProfileBox = () => {
    const [user, setUser] = useState();

    const userInfo = fetchUser();
    const { userId } = useParams();

    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    useEffect(() => {
     const query = userQuery(userInfo?.googleId);

     client.fetch(query)
        .then((data) => {
            setUser(data[0]);
        })
    }, [userId]);

    return<div>
    { user && ( <a class="profile">
    <div class="profile-photo">
        <Link to={`user-profile/${user?._id}`}>
        <img src={user?.image}/></Link>
    </div>
    <div class="handel">
        <Link className="font-bold" to={`user-profile/${user?._id}`}><h4>{user?.userName}</h4></Link>
        <Link to={`user-profile/${user?._id}`}>
        <small class="text-muted">
            {user?.email}</small>
        </Link>
    </div>
</a>)}</div>
}

export default ProfileBox ;