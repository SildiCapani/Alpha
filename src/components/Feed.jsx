import React, { useState, useEffect} from 'react'
import Pin from './Pin';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { feedQuery, searchQuery } from '../utils/data';
import { data } from 'autoprefixer';

const Feed = () => {

  const [loading, setLoading] = useState(false);
  
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
  
    if(categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query)
      .then((data) => {
        setPins(data);
        setLoading(false)
      } )
    }else{
    client.fetch(feedQuery)
      .then((data) => {
      setPins(data);
      setLoading(false);
      })
    }
    
  }, [categoryId])
  

if(loading) return <Spinner message="Allpha is loading..." />
  return (
    <div className='feeds'>

    {pins && <MasonryLayout pins={pins}/>}

    {/* <Pin author={'Doge'} 
    createdDate={'11-02-2022'}
    userImageSource={require("../images/doge.jpg")} 
    postImageSource={require("../images/images2.jpg")}
    post={'Kodimi esht nga profesionet me te kerkuara ne gjith boten'}
    />  
    
    <Pin author={'Brisild Capani'} 
    createdDate={'01-02-2022'}
    userImageSource={require("../images/logo-1.png")} 
    postImageSource={require("../images/Download.jpg")}
    post={'Kodimi esht nga profesionet me te kerkuara ne gjith boten'}
    />  
    
    <Pin author={'Cristiano Ronaldo'} 
    createdDate={'09-09-2021'}
    userImageSource={require("../images/images.jpg")} 
    postImageSource={require("../images/Download.jpg")}
    post={'Kodimi esht nga profesionet me te kerkuara ne gjith boten Kodimi esht nga profesionet me te kerkuara ne gjith boten Kodimi esht nga profesionet me te kerkuara ne gjith boten'}
    />*/}</div> 
  )
}
export default Feed ;