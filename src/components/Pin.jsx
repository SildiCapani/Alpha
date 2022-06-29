import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../client';
import "../styles/style.css";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { AiFillDelete, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';
import { MdDownloadForOffline } from 'react-icons/md';
import { fetchUser } from '../utils/fetchUser';
import { set } from 'mobx';




const Pin = ({pin}) => {
    
    const { postedBy, image, _id, information, save, _createdAt, like  } = pin;
    const navigate = useNavigate();
    const [ postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);
    const [likedPost, setLikedPost] = useState(false);
    const user = fetchUser();
    const key = {_key: uuidv4()};

    let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

    alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

    let alreadyLiked = pin?.like?.filter((item) => item.postedBy?._id === user?.googleId);

    alreadyLiked = alreadyLiked?.length > 0 ? alreadyLiked : [];


    const savePin = (id) => {        
        
        if (alreadySaved?.length === 0) {
          setSavingPost(true);
    
          client
            .patch(id)
            .setIfMissing({ save: [] })
            .insert('after', 'save[-1]', [{
                _key: uuidv4(),
              userId: user?.googleId,
              postedBy: {
                _type: 'postedBy',
                _ref: user?.googleId,
              },
            }])
            .commit()
            .then(() => {
              window.location.reload();
              setSavingPost(false);
            });
        }
      };

       const likePin = (id) => {
           if (alreadyLiked?.length === 0 ) {
               setLikedPost(true);

             client
               .patch(id)
               .setIfMissing({ like: [] })
               .insert('after', 'like[-1]', [{
                _key: uuidv4(),
              userId: user?.googleId,
              postedBy: {
                _type: 'postedBy',
                _ref: user?.googleId,
              },
            }])
            
               .commit()
               .then(() => {
                   window.location.reload();
                   setLikedPost(false);
               });
           }
       };

       const deletePin = (id) => {
           client
           .delete(id)
           .then(() => {
             window.location.reload();
           })
       }

    const [isReadMoreShown, setReadMoreShown ] = useState(false);
    const toggleBtn = () => {
        setReadMoreShown(prevState => !prevState)

    }

    
    return <div className='feeds'> <div className="feed">
    
  
        <div class="head">
        <div class="user">
            <div class="profile-photo">
                <Link to={`user-profile/${user?._id}`}>
                 <img src={postedBy.image} /></Link>
            </div>
            <div class="info">
                <h2 className='capitalize'>{postedBy.userName}</h2>
                <small>{_createdAt.slice(0, 10)}</small>
            </div>

        </div>
        <span class="edit">
                    <i class="uil uil-ellipsis-h"></i>
        </span>
    </div>

    <div class="photo">

        <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        >
        <img className="rounded-lg w-full " src={urlFor(image).width(250).url()} alt="user-post" />
        {postHovered && (
            <div 
            className='absolute top-0 w-full h-full flex flex-row justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{ height: '100%' }}
            >
                <div className='flex items-center justify-between'>
                    <div className='flex gap-2'>
                        <a
                          href={`${image?.asset?.url}?dl=`}
                          download
                          onClick={(e) => e.stopPropagation()}
                          className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                          style={{ color: 'dark' }}
                        >
                        <MdDownloadForOffline style={{ color: 'black'}} />
                        </a>
                    </div>
                </div>
                {postedBy?._id === user?.googleId && (
            <button
            type='button'
            onClick={(e) => {
                e.stopPropagation();
                deletePin(_id);
            } }
            className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
            >
                <AiFillDelete color='red' />
            </button>
        )}
            </div>
        ) }
        
        </div>
    </div>

    <div className="action-buttons">
        <div className="interaction-buttons">
          {alreadyLiked?.length !== 0 ? (
                <button
                className='save'
                type='button'
                >
                    <AiFillHeart  style={{color: 'red' }}/>
                </button>
            ) : (
                <button
                type='button'
                className='save'
                onClick={(e) => {
                    e.stopPropagation();
                    likePin(_id);
                }}
                >
                    <AiOutlineHeart  style={{color: 'red' }}/>
                </button>
            )}  
       
           
         
            <span><BiComment/></span>
        </div> 
        <div class="bookmark">
        {alreadySaved?.length !== 0 ? (
               <button type='button'
               className="save"
               onClick={(e) => {
                window.location.reload();
                
            } }
               > {pin?.save?.length}  <IoBookmark /></button> 
        ): (
                <button
                onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                    window.location.reload();
                } }
                type='button'
                >
                {pin?.save?.length}
                <IoBookmarkOutline/></button>  
            )}
        </div>
    </div>

    <div class="caption">
       {information && ( <p className='content'> <b className='capitalize'>{postedBy.userName}</b>: { isReadMoreShown ? information : information.substr(0, 300) } {information?.length >= 300 ? (<button className='ReadMore' onClick={toggleBtn}>{isReadMoreShown ? 'Read Less' : '... Read More'}</button>) : (<div></div>)}  </p>)}
     
    </div>
     
</div></div>
}


export default Pin;