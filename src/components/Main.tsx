import React, { useEffect, useState } from 'react';
import MapContainer from './MapContainer';
import Sidebar from './Sidebar';
import Tabs from './Tabs';

interface StorageInterface {
  [key: string]: {
    [key: string]: string | null;
  };
}

const Main: React.FC = () => {
  const [currentMap, setCurrentMap] = useState<string>('world');
  const [storage, setStorage] = useState<StorageInterface>({});
  const [selections, setSelections] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    setSelections({ ...storage[currentMap] });
  }, [currentMap, storage]);

  /**
   * Update data of 'storage' state.
   * @param region : string
   * @param color : string or null
   */
  const saveRegion = (region: string, color: string | null) => {
    const tempStorage: StorageInterface = { ...storage };

    if (color === null && tempStorage[currentMap] && tempStorage[currentMap][region]) {
      delete tempStorage[currentMap][region];
    } else {
      tempStorage[currentMap] = {
        ...tempStorage[currentMap],
        [region]: color,
      };
    }

    setStorage(tempStorage);

    try {
      // Save data to localStorage.
      localStorage.setItem('map', JSON.stringify(tempStorage));
    } catch (err) {
      console.error('Cannot save a data:', err);
    }
  };

  /**
   * Get data from localStorage.
   */
  useEffect(() => {
    try {
      const dataFromStorage: string | null = localStorage.getItem('map');
      if (dataFromStorage) {
        const savedStorage: StorageInterface = JSON.parse(dataFromStorage);
        setStorage(savedStorage);
      }
    } catch (err) {
      console.error('Cannot get data from the storage:', err);
    }
  }, []);

  const clearMapAction = (): void => {
    if (window.confirm('Are you sure?')) {
      try {
        const dataFromStorage: string | null = localStorage.getItem('map');
        if (dataFromStorage) {
          const savedStorage: StorageInterface = JSON.parse(dataFromStorage);
          delete savedStorage[currentMap];
          setStorage(savedStorage);
          localStorage.setItem('map', JSON.stringify(savedStorage));
        }
      } catch (err) {
        console.error('Cannot clear a map:', err);
      }
    }
  };

  return (
    <div className='layout'>
      <div className='left'>
        <Tabs activeMap={currentMap} setCurrentMap={setCurrentMap} />
        <MapContainer name={currentMap} selections={selections || {}} saveRegion={saveRegion} />
      </div>
      <div className='right'>
        <Sidebar clearMapAction={clearMapAction} selections={selections || {}} />
      </div>
    </div>
  );
};

export default Main;
