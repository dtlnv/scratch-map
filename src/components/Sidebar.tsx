import React from 'react';
import ColorsBlock from './ColorsBlock';
import MenuItem from './MenuItem';
import Maps from '../maps.json';
import html2canvas from 'html2canvas';

interface SidebarInterface {
  map: string;
  addMapAction: Function;
  clearMapAction: Function;
  removeMapAction: Function;
  selections: { [key: string]: string };
}

const Sidebar: React.FC<SidebarInterface> = ({ map, addMapAction, clearMapAction, removeMapAction, selections }) => {
  const shareAction = async () => {
    document.body.classList.add('screenshot'); // Hide some elements for a screenshot.

    const screenshot = await html2canvas(document.body); // Create a screenshot.

    document.body.classList.remove('screenshot'); // Revert items back to their original state.

    // Download the screenshot
    const screenshotDataURL = screenshot.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = screenshotDataURL;
    a.download = map + '.png';
    a.click();
    a.remove();
  };

  return (
    <div className='sidebar'>
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
      <div className='block'>
        <ColorsBlock selections={selections} />
      </div>
      <div className='copyright'>{window?.location.host}</div>
    </div>
  );
};

export default Sidebar;
