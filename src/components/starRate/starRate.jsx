import React, { useState, useEffect } from 'react';
import { TiStarFullOutline } from "react-icons/ti";

import './starRate.scss'

const StarRate = ({  voteAverage }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(Math.round(voteAverage / 2)); 
  }, [voteAverage]);

  return (
    <div className='star'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <TiStarFullOutline
            key={index}
            size={30}
            style={{ color: index < rating ? "white" : "gray" }} 
          />
        ))}
    </div>
  );
};

export default StarRate;
