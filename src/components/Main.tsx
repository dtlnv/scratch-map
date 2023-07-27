import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Tabs from './Tabs';
import Maps from '../maps.json';
import Map from './Map';

const USER_STORAGE = '_scratch_map_user_storage_key_';

interface StorageInterface {
  [key: string]: {
    [key: string]: string;
  };
}

const Main: React.FC = () => {
  const [currentMap, setCurrentMap] = useState<string>('world');
  const [storage, setStorage] = useState<StorageInterface>({});
  const [userList, setUserList] = useState<string[]>(['world']);

  /**
   * Get data from localStorage.
   */
  useEffect(() => {
    try {
      const appData: string | null = localStorage.getItem(USER_STORAGE);

      if (appData) {
        const data = JSON.parse(appData);
        setStorage(data.storage);
        setUserList(data.userList);
      }
    } catch (err) {
      console.error('Cannot get data from the storage:', err);
    }
  }, []);

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
      // Save data to localStorage with the common key.
      localStorage.setItem(USER_STORAGE, JSON.stringify({ storage: tempStorage, userList, currentMap }));
    } catch (err) {
      console.error('Cannot save data:', err);
    }
  };

  const clearMapAction = (): void => {
    try {
      const dataFromStorage: string | null = localStorage.getItem(USER_STORAGE);
      if (dataFromStorage) {
        const savedData = JSON.parse(dataFromStorage);
        savedData.storage[currentMap] = {};
        setStorage(savedData.storage);
        localStorage.setItem(USER_STORAGE, JSON.stringify({ ...savedData, storage: savedData.storage }));
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
        localStorage.setItem(USER_STORAGE, JSON.stringify({ storage, userList: tempUserList }));
      } catch (err) {
        console.error('Cannot save data:', err);
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
        localStorage.setItem(USER_STORAGE, JSON.stringify({ storage, userList: tempUserList }));
      } catch (err) {
        console.error('Cannot save data:', err);
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
        <Map name={currentMap} selections={storage[currentMap]} saveRegion={saveRegion} />
      </div>
      <div className='right'>
        <Sidebar
          map={currentMap}
          addMapAction={addMapAction}
          clearMapAction={confirmWrap(clearMapAction)}
          removeMapAction={confirmWrap(removeMapAction)}
          selections={storage[currentMap]}
        />
      </div>
    </div>
  );
};

export default Main;
