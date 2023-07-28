import React from 'react';
import Sidebar from './Sidebar';
import Tabs from './Tabs';
import Map from './Map';
import { useInitMap } from './hooks';

const Main: React.FC = () => {
  const { currentMap, userList, setCurrentMap, selections, saveRegions, addMapAction, clearMapAction, removeMapAction, confirmWrap } =
    useInitMap();

  if (!currentMap) return '...';

  return (
    <div className='layout'>
      <div className='left'>
        <Tabs activeMap={currentMap} mapsList={userList} setCurrentMap={setCurrentMap} />
        <Map name={currentMap} selections={selections} saveRegions={saveRegions} />
      </div>
      <div className='right'>
        <Sidebar
          map={currentMap}
          addMapAction={addMapAction}
          clearMapAction={confirmWrap(clearMapAction)}
          removeMapAction={confirmWrap(removeMapAction)}
          selections={selections}
        />
      </div>
    </div>
  );
};

export default Main;
