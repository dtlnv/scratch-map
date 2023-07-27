import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Tabs from './Tabs';
import Maps from '../maps.json';
import Map from './Map';

const STORAGE_SELECTIONS_KEY = '_scratch_selections_key_';
const STORAGE_USER_MAPS_KEY = '_scratch_map_key_';

interface StorageInterface {
  [key: string]: {
    [key: string]: string;
  };
}

const Main: React.FC = () => {
  const [currentMap, setCurrentMap] = useState<string>('world');
  const [storage, setStorage] = useState<StorageInterface>({});
  const [selections, setSelections] = useState<{ [key: string]: string }>({});
  const [userList, setUserList] = useState<string[]>(['world']);

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
    } else if (color) {
      tempStorage[currentMap] = {
        ...tempStorage[currentMap],
        [region]: color,
      };
    }

    setStorage(tempStorage);

    try {
      // Save data to localStorage.
      localStorage.setItem(STORAGE_SELECTIONS_KEY, JSON.stringify(tempStorage));
    } catch (err) {
      console.error('Cannot save a data:', err);
    }
  };

  /**
   * Get data from localStorage.
   */
  useEffect(() => {
    try {
      const selectionStorage: string | null = localStorage.getItem(STORAGE_SELECTIONS_KEY);
      const userMaps: string | null = localStorage.getItem(STORAGE_USER_MAPS_KEY);

      if (selectionStorage) {
        setStorage(JSON.parse(selectionStorage));
      }

      if (userMaps) {
        setUserList(JSON.parse(userMaps));
      }
    } catch (err) {
      console.error('Cannot get data from the storage:', err);
    }
  }, []);

  const clearMapAction = (): void => {
    try {
      const dataFromStorage: string | null = localStorage.getItem(STORAGE_SELECTIONS_KEY);
      if (dataFromStorage) {
        const savedStorage: StorageInterface = JSON.parse(dataFromStorage);
        delete savedStorage[currentMap];
        setStorage(savedStorage);
        localStorage.setItem(STORAGE_SELECTIONS_KEY, JSON.stringify(savedStorage));
      }
    } catch (err) {
      console.error('Cannot clear a map:', err);
    }
  };

  const addMapAction = (newMap: string): void => {
    const isMap = Maps.find((region) => region.map === newMap)?.name;
    if (isMap) {
      const tempUserList: string[] = [...new Set([...userList, newMap])];
      setUserList(tempUserList);
      setCurrentMap(newMap);

      try {
        // Save data to localStorage.
        localStorage.setItem(STORAGE_USER_MAPS_KEY, JSON.stringify(tempUserList));
      } catch (err) {
        console.error('Cannot save a data:', err);
      }
    }
  };

  const removeMapAction = (): void => {
    const isMap = Maps.find((region) => region.map === currentMap)?.name;
    if (isMap) {
      const tempUserList: string[] = userList.filter((map) => map !== currentMap);
      setUserList(tempUserList);
      setCurrentMap(tempUserList[0]);
      clearMapAction();

      try {
        // Save data to localStorage.
        localStorage.setItem(STORAGE_USER_MAPS_KEY, JSON.stringify(tempUserList));
      } catch (err) {
        console.error('Cannot save a data:', err);
      }
    }
  };

  const confirmWrap = (fn: Function) => {
    return () => {
      if (window.confirm('Are you sure?')) {
        fn();
      }
    };
  };

  return (
    <div className='layout'>
      <div className='left'>
        <Tabs activeMap={currentMap} mapsList={userList} setCurrentMap={setCurrentMap} />
        <Map name={currentMap} selections={selections || {}} saveRegion={saveRegion} />
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
