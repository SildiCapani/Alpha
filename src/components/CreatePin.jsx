import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { client } from "../client";
import Spinner from './Spinner';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md' 
import { userQuery } from '../utils/data';

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('');
  const [information, setInformation] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState();
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [worngTypeImage, setWorngTypeImage] = useState(false);


  const navigate = useNavigate();

  const uploadImage = (e) => {
    const  selectedFile = e.target.files[0];

    if(selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWorngTypeImage(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWorngTypeImage(true);
    }
  };

  const savePin = () => {
    if(title && information && about && imageAsset?._id ) {
      const doc = {
        _type: 'pin',
        title,
        about,
        information,
        image: {
          _type: 'image',
          asset: {
            _type: 'refernce',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
      };
      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };

  return (
    <div className='createPin justify-center'>
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in '>Please fill in all the fields</p>
      )}
      <div className='flex lg:flex-col flex-col justify-center items-center lg:p-5 p-3 ' >
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full '>
          <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
              {loading && <Spinner/>}
              {worngTypeImage && <p>Wrong image type</p>}
              {!imageAsset ? (
                <label>
                  <div className='flex flex-col items-center justify-center w-full h-full'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className=' font-bold text-2xl'>
                      <AiOutlineCloudUpload style={{ color:'black' }} />
                    </p>
                    <p className='text-lg' style={{ color: 'black'}}>Click to upload</p>
                  </div>
                  <p className="mt-31 text-gray-400">
                    Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                  </p>
                  </div>
                  <input
                  type='file'
                  name='uplapd-image'
                  className="w-0 h-0"
                  onChange={uploadImage}
                  >
                  
                  </input>
                 {/*  <div className='text-input'> 
               <button className='b btn btn-primary ' onClick={uploadImage}>Post</button> </div>*/}
                </label>
                
                ) : (
                  <div className="relative h-full">
                  <img
                    src={imageAsset?.url}
                    alt="uploaded-pic"
                    className="h-full w-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete style={{ color: 'black' }} />
                  </button>
                </div>
                )}
          </div>

         
        </div> 
        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
              
         { user && (
            <div className="flex gap-2 mt-2 mb-2 items-center rounded-lg ">
              <img
                src={user?.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} class="create-post" placeholder="Title"/>
              <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} class="create-post" placeholder="About"/>
              <textarea className='create-post' type="text"  rows={5} placeholder="Share you Information" onChange={(e) => setInformation(e.target.value)} style={{ height:"90px" }} value={information} cols="60" ></textarea>
          <div className='btn1'>
            <button className='btn btn-primary' onClick={savePin}>ADD</button></div>
        </div>
    </div></div>
  )
}

export default CreatePin