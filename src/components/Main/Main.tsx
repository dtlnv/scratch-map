import React, { useState } from 'react';
import './Main.scss';
import MapContainer from '../MapContainer/MapContainer';
import Sidebar from '../Sidebar/Sidebar';
import Tabs from '../Tabs/Tabs';

const Main: React.FC = () => {
  const [currentMap, setCurrentMap] = useState<string>('world');

  return (
    <div className='layout'>
      <div className='left'>
        <Tabs activeMap={currentMap} setCurrentMap={setCurrentMap} />
        <MapContainer name={currentMap} />
      </div>
      <div className='right'>
        <Sidebar />
      </div>
    </div>
  );
};

export default Main;
