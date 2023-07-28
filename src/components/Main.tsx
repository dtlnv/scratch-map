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
  const [currentMap, setCurrentMap] = useState<string>('');
  const [storage, setStorage] = useState<StorageInterface>({});
  const [userList, setUserList] = useState<string[]>(['']);

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
        if (data.userList[0]) {
          setCurrentMap(data.userList[0]);
        }
      }
    } catch (err) {
      console.error('Cannot get data from the storage:', err);
    }
  }, []);

  /**
   * Update data of 'storage' state.
   * @param regions : string[]
   * @param color : string or null
   */
  const saveRegions = (regions: string[], color: string | null) => {
    const tempStorage: StorageInterface = { ...storage };

    for (let id of regions) {
      if (color) {
        tempStorage[currentMap][id] = color;
      } else {
        delete tempStorage[currentMap][id];
      }
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
      if (tempUserList.length === 0) {
        tempUserList.push('world');
      }

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
      {currentMap ? (
        <div className='left'>
          <Tabs activeMap={currentMap} mapsList={userList} setCurrentMap={setCurrentMap} />
          <Map name={currentMap} selections={{ ...storage[currentMap] }} saveRegions={saveRegions} />
        </div>
      ) : (
        '...'
      )}
      <div className='right'>
        {currentMap ? (
          <Sidebar
            map={currentMap}
            addMapAction={addMapAction}
            clearMapAction={confirmWrap(clearMapAction)}
            removeMapAction={confirmWrap(removeMapAction)}
            selections={{ ...storage[currentMap] }}
          />
        ) : (
          '...'
        )}
      </div>
    </div>
  );
};

export default Main;
