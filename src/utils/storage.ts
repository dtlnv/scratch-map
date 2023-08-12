const USER_STORAGE = '_scratch_map_user_storage_key_';

export interface RegionsInterface {
  [key: string]: {
    [key: string]: string;
  };
}

interface StorageInterface {
  mapsList: string[];
  regions: RegionsInterface;
}

/**
 * Get user data from the localStorage and return it as an object.
 * @returns {object} - Data from the localStorage.
 */
export const getFromLocalStorage = (): StorageInterface => {
  try {
    const appData: string | null = localStorage.getItem(USER_STORAGE);
    if (appData) {
      return JSON.parse(appData);
    }
  } catch (err) {
    console.error('Cannot get data from the storage:', err);
  }

  return {
    mapsList: ['world'],
    regions: {},
  };
};

/**
 * Save user data into localStorage.
 * @param {storage} - Data for the localStorage.
 */
export const saveInLocalStorage = (storage: StorageInterface): void => {
  try {
    localStorage.setItem(USER_STORAGE, JSON.stringify(storage));
  } catch (err) {
    console.error('Cannot save data:', err);
  }
};
