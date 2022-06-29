import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import {pinDetailMorePinQuery, PinDetailMorePinQuery, pinDetailQuery, PinDetailQuery, userQuery } from '../utils/data';
import Spinner from './Spinner';

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail ] = useState();
  const [comment, setComment ] = useState("");
  const [addingComment, setAddingComment ] = useState();

  const { pinId } = useParams();

  const addComment = () => {
    if(comment) {
      setAddingComment(true);

      client
      .patch(pinId)
      .setIfMissing({ comment: [] })
      .insert('after', 'comments[-1]', [{
        comment,
        _key: uuidv4(),
        postedBy: {
          _type: 'postedBy',
          _ref: user._id
        }
      }])
      .commit()
      .then(() => {
        fetchPindetails();
        setComment('');
        setAddingComment(false);
      })
    }
  }

  const fetchPindetails = () => {
    let query = pinDetailQuery(pinId);

    if(query) {
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0]);

          if(data[0]) {
            query = pinDetailMorePinQuery(data[0]);

            client.fetch(query)
              .then((res) => setPins(res));
          }
        } )
    } 
  };

  useEffect(() => {
    fetchPindetails();
  }, [pinId])


  if(!pinDetail) return <Spinner message="Loading ..."/>

  return (
    <div>
    <div className='Pin-text mt-5 flex lx-flex-row flex-col m-auto ' style={{ maxWhidth: '1500px', borderRadius: '32px' }}>
      <div className='flex justify-center items-center md:items-start flex-initial'> 
        <img style={{ width: '1000px', height: '700px' }} 
        className="rounded-t-3xl rounded-b-lg"
        src={pinDetail?.image && urlFor(pinDetail.image).url() }
        />
        
      </div> <h2 className='information flex justify-center' ><b>{pinDetail.title}</b></h2> <p className='information'>{pinDetail.information}</p>
    </div> <h2 className='mt-5 text-2xl'>Commenst</h2>
    <div className='max-h-370 overwflow-y-auto'>
      <hr/>
      {pinDetail?.comments?.map((comment, i) => (
        <div className='flex gap-5 mt-5 items-center reunded-lg' key={i}> 
          <img src={comment.postedBy.image}
          alt="user-profile"
          className='w-10 h-10 rounded-full cursor-pointer'
          />
          <div className='flex flex-col'>
            <p className='font-bold'>{comment.postedBy.userName}</p>
            <p>{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
    <div className='flex flex-wrap mt-6 gap-3'>
    <Link to={`user-profile/${user?._id}`} >
      <img 
      className='w-10 h-10 rounded-full cursor-pointer'
      src={user.image}
      alt='user-profile'
      />
    </Link>
    <input
          className="create-post"
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
    /> <button className='btn btn-primary' onClick={addComment}>{addingComment ? 'Posting ...' : 'comment' }</button>

    </div>
    </div>
  )

}

export default PinDetail