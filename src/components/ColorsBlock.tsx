import React, { useEffect, useState } from 'react';

interface ColorsBlockInterface {
  selections: { [key: string]: string | null } | null;
}

const ColorsBlock: React.FC<ColorsBlockInterface> = ({ selections }) => {
  useEffect(() => {
    console.log('selections', selections);
    
  }, [selections]);

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
