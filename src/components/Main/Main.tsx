import React, { useState } from 'react';
import './Main.scss';
import MapContainer from '../MapContainer/MapContainer';
import Sidebar from '../Sidebar/Sidebar';

const Main: React.FC = () => {
  return (
    <div className='layout'>
      <div className='left'>
        <MapContainer name='world' />
      </div>
      <div className='right'>
        <Sidebar />
      </div>
    </div>
  );
};

export default Main;
