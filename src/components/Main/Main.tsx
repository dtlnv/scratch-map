import React, { useState } from 'react';
import './Main.scss';
import MapContainer from '../MapContainer/MapContainer';
import Sidebar from '../Sidebar/Sidebar';
import Tabs from '../Tabs/Tabs';

const Main: React.FC = () => {
  return (
    <div className='layout'>
      <div className='left'>
        <Tabs activeMap='urkaine' />
        <MapContainer name='ukraine' />
      </div>
      <div className='right'>
        <Sidebar />
      </div>
    </div>
  );
};

export default Main;
