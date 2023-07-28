import { useEffect, useState } from "react";
import Maps from '../../maps.json';


const USER_STORAGE = '_scratch_map_user_storage_key_';

interface StorageInterface {
    [key: string]: {
        [key: string]: string;
    };
}

const getFromLocalStorage = () => {
    try {
        const appData: string | null = localStorage.getItem(USER_STORAGE);
        if (appData) {
            return JSON.parse(appData);
        }
    } catch (err) {
        console.error('Cannot get data from the storage:', err);
    }
    return {};
}

const saveInLocalStorage = (obj: object) => {
    try {
        localStorage.setItem(USER_STORAGE, JSON.stringify(obj));
    } catch (err) {
        console.error('Cannot save data:', err);
    }
}

const useInitMap = () => {
    const [currentMap, setCurrentMap] = useState<string>('');
    const [storage, setStorage] = useState<StorageInterface>({});
    const [userList, setUserList] = useState<string[]>(['']);

    /**
     * Get data from localStorage.
     */
    useEffect(() => {
        const data = getFromLocalStorage();
        setStorage(data.storage);
        setUserList(data.userList);
        if (data.userList[0]) {
            setCurrentMap(data.userList[0]);
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
        saveInLocalStorage({ storage: tempStorage, userList, currentMap });
    };

    const clearMapAction = (): void => {
        const savedData = getFromLocalStorage();
        savedData.storage[currentMap] = {};
        setStorage(savedData.storage);
        saveInLocalStorage({ ...savedData, storage: savedData.storage });
    };

    const addMapAction = (newMap: string): void => {
        const isMap = Maps.find((region) => region.map === newMap)?.name;
        if (isMap) {
            const tempUserList: string[] = [...new Set([...userList, newMap])];
            setUserList(tempUserList);
            setCurrentMap(newMap);
            saveInLocalStorage({ storage, userList: tempUserList });
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
            saveInLocalStorage({ storage, userList: tempUserList });
        }
    };

    const confirmWrap = (fn: Function) => {
        return () => {
            if (window.confirm('Are you sure?')) {
                fn();
            }
        };
    };

    return {
        currentMap,
        userList,
        setCurrentMap,
        selections: { ...storage[currentMap] },
        saveRegions,
        addMapAction,
        clearMapAction,
        removeMapAction,
        confirmWrap,
    };
};

export default useInitMap;
