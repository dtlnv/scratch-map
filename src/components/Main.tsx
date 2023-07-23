import React, { useState } from 'react';
import MapContainer from './MapContainer';
import Sidebar from './Sidebar';
import Tabs from './Tabs';

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
