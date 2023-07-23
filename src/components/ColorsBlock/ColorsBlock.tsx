import React, { useEffect, useState } from 'react';
import './ColorsBlock.scss';

interface ColorsBlockInterface {}

const ColorsBlock: React.FC<ColorsBlockInterface> = ({}) => {
  return (
    <div className='colors-block'>
      <div className='color-block'>
        <div className='color color-1' />
        Visited
      </div>
      <div className='color-block'>
        <div className='color color-2' />
        Transit
      </div>
      <div className='color-block'>
        <div className='color color-3' />
        Want to visit
      </div>
      <div className='color-block'>
        <div className='color color-4' />
        Favorite
      </div>
      <div className='color-block'>
        <div className='color color-5' />
        Never again
      </div>
    </div>
  );
};

export default ColorsBlock;