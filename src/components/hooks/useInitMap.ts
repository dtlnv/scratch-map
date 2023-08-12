import { useEffect, useState } from 'react';
import Maps from '../../utils/maps.json';
import { getFromLocalStorage, saveInLocalStorage, RegionsInterface } from '../../utils/storage';

/**
 * Set current map.
 * Get data from the storage.
 * Save data into the storage.
 * @returns {object}
 */
const useInitMap = () => {
  const [currentMap, setCurrentMap] = useState<string>(''); // Name of the displayed map.
  const [regions, setRegions] = useState<RegionsInterface>({}); // Saved regions with colors.
  const [mapsList, setMapsList] = useState<string[]>(['']); // Saved list of user cards.

  // Get data from the localStorage.
  useEffect(() => {
    const data = getFromLocalStorage();
    setRegions(data.regions);

    if (data.mapsList) {
      setMapsList(data.mapsList);
    } else {
      setMapsList(['world']);
    }

    if (data.mapsList?.[0]) {
      setCurrentMap(data.mapsList[0]);
    } else {
      setCurrentMap('world');
    }
  }, []);

  /**
   * Update data of 'regions' state and save it in localStorage
   * @param regions : string[]
   * @param color : string or null. null is for clearing.
   */
  const saveRegions = (regionsList: string[], color: string | null): void => {
    const tempStorage: RegionsInterface = { ...regions };

    for (let id of regionsList) {
      if (color) {
        if (!tempStorage[currentMap]) {
          tempStorage[currentMap] = {};
        }
        tempStorage[currentMap][id] = color;
      } else {
        delete tempStorage[currentMap][id];
      }
    }

    setRegions(tempStorage);
    saveInLocalStorage({ regions: tempStorage, mapsList });
  };

  // Remove all colors for the current map.
  const clearMapAction = (): void => {
    const savedData = getFromLocalStorage();
    savedData.regions[currentMap] = {};
    setRegions(savedData.regions);
    saveInLocalStorage({ ...savedData, regions: savedData.regions });
  };

  // Add a new map.
  const addMapAction = (newMap: string): void => {
    const isMap: string | undefined = Maps.find((region) => region.map === newMap)?.name;
    if (isMap) {
      const tempMapsList: string[] = [...new Set([...mapsList, newMap])];
      setMapsList(tempMapsList);
      setCurrentMap(newMap);
      saveInLocalStorage({ regions, mapsList: tempMapsList });
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
      saveInLocalStorage({ regions, mapsList: tempMapsList });
    }
  };

  // Wrap the function with window.confirm.
  const confirmWrap = (fn: Function): (() => void) => {
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
    selections: { ...regions?.[currentMap] },
    saveRegions,
    addMapAction,
    clearMapAction: confirmWrap(clearMapAction),
    removeMapAction: confirmWrap(removeMapAction),
  };
};

export default useInitMap;
