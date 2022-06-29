import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

const breakpointObj = {
  default: 2,
  3000: 1,
  2000: 2, 
  1200: 1,
  1000: 1,
  500: 1
}


const MasonryLayout = ({ pins }) => {
  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>
    {pins?.map((pin) => <Pin key={pin._id} pin={pin} />)}
  </Masonry>
)
}

export default MasonryLayout