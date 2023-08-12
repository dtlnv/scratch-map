import React from 'react';
import ColorsBlock from './ColorsBlock';
import MenuItem from './MenuItem';
import Maps from '../utils/maps.json';
import html2canvas from 'html2canvas';

interface SidebarInterface {
  map: string;
  addMapAction: (newMap: string) => void;
  clearMapAction: () => void;
  removeMapAction: () => void;
  selections: { [key: string]: string };
}

/**
 * Sidebar in the right side of the application.
 * Show ColorsBlock for the information about current map.
 * Show menu items for user interaction (add, clear, delete, download maps).
 */
const Sidebar: React.FC<SidebarInterface> = ({ map, addMapAction, clearMapAction, removeMapAction, selections }) => {
  // Download current map function.
  const shareAction = async () => {
    document.body.classList.add('screenshot'); // Hide some elements for a screenshot.

    const screenshot = await html2canvas(document.body); // Make a screenshot.

    document.body.classList.remove('screenshot'); // Revert items back to their original state.

    const screenshotDataURL = screenshot.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = screenshotDataURL;
    a.download = map + '.png';
    a.click(); // Download the screenshot.
    a.remove();
  };

  return (
    <div className='sidebar'>
      <div className='block'>
        <ColorsBlock selections={selections} />
      </div>
      <div className='block tools-block'>
        <MenuItem icon='add' className='select'>
          <select onChange={(e) => addMapAction(e.target.value)} value={''}>
            <option>Add map</option>
            {Maps.map((option) => (
              <option key={option.map} value={option.map}>
                {option.name}
              </option>
            ))}
          </select>
        </MenuItem>
        <MenuItem icon='clear' onClick={clearMapAction}>
          Clear map
        </MenuItem>
        <MenuItem icon='remove' onClick={removeMapAction}>
          Remove map
        </MenuItem>
        <MenuItem icon='download' onClick={shareAction}>
          Download map
        </MenuItem>
      </div>
    </div>
  );
};

export default Sidebar;
