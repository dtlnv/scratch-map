import { useEffect, useState } from "react";
import Maps from '../../maps.json';

const USER_STORAGE = '_scratch_map_user_storage_key_';

/**
 * Get user data from the localStorage and return it as an object.
 * @returns {object} - Data from the localStorage.
 */
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

/**
 * Save user data into localStorage.
 * @param {obj} - Data for the localStorage.
 */
const saveInLocalStorage = (obj: object) => {
    try {
        localStorage.setItem(USER_STORAGE, JSON.stringify(obj));
    } catch (err) {
        console.error('Cannot save data:', err);
    }
}

interface StorageInterface {
    [key: string]: {
        [key: string]: string;
    };
}

/**
 * Set current map.
 * Get data from the storage.
 * Save data into the storage.
 * @returns {object}
 */
const useInitMap = () => {
    const [currentMap, setCurrentMap] = useState<string>(''); // Name of the displayed map.
    const [storage, setStorage] = useState<StorageInterface>({}); // Saved regions with colors.
    const [mapsList, setMapsList] = useState<string[]>(['']); // Saved list of user cards.

    // Get data from the localStorage.
    useEffect(() => {
        const data = getFromLocalStorage();
        setStorage(data.storage);

        if (data.mapsList) {
            setMapsList(data.mapsList);
        } else {
            setMapsList(['world'])
        }

        if (data.mapsList?.[0]) {
            setCurrentMap(data.mapsList[0]);
        } else {
            setCurrentMap('world');
        }
    }, []);

    /**
     * Update data of 'storage' state and save it in localStorage
     * @param regions : string[]
     * @param color : string or null. null is for clearing.
     */
    const saveRegions = (regions: string[], color: string | null): void => {
        const tempStorage: StorageInterface = { ...storage };

        for (let id of regions) {
            if (color) {
                if (!tempStorage[currentMap]) {
                    tempStorage[currentMap] = {}
                }
                tempStorage[currentMap][id] = color;
            } else {
                delete tempStorage[currentMap][id];
            }
        }

        setStorage(tempStorage);
        saveInLocalStorage({ storage: tempStorage, mapsList, currentMap });
    };

    // Remove all colors for the current map.
    const clearMapAction = (): void => {
        const savedData = getFromLocalStorage();
        savedData.storage[currentMap] = {};
        setStorage(savedData.storage);
        saveInLocalStorage({ ...savedData, storage: savedData.storage });
    };

    // Add a new map.
    const addMapAction = (newMap: string): void => {
        const isMap: string | undefined = Maps.find((region) => region.map === newMap)?.name;
        if (isMap) {
            const tempMapsList: string[] = [...new Set([...mapsList, newMap])];
            setMapsList(tempMapsList);
            setCurrentMap(newMap);
            saveInLocalStorage({ storage, mapsList: tempMapsList });
        }
    };

    // Remove the current map.
    const removeMapAction = (): void => {
        const isMap: string | undefined = Maps.find((region) => region.map === currentMap)?.name;
        if (isMap) {
            const tempMapsList: string[] = mapsList.filter((map) => map !== currentMap);
            if (tempMapsList.length === 0) {
                tempMapsList.push('world');
            }

            setMapsList(tempMapsList);
            setCurrentMap(tempMapsList[0]);
            clearMapAction();
            saveInLocalStorage({ storage, mapsList: tempMapsList });
        }
    };

    // Wrap the function with window.confirm.
    const confirmWrap = (fn: Function): Function => {
        return () => {
            if (window.confirm('Are you sure?')) {
                fn();
            }
        };
    };

    return {
        currentMap,
        mapsList,
        setCurrentMap,
        selections: { ...storage?.[currentMap] },
        saveRegions,
        addMapAction,
        clearMapAction,
        removeMapAction,
        confirmWrap,
    };
};

export default useInitMap;
