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

const hideClasses = '.tab:not(.active), .zoom-buttons, .tools-block';

const Sidebar: React.FC<SidebarInterface> = ({ map, addMapAction, clearMapAction, removeMapAction, selections }) => {
  const shareAction = async () => {
    // Hide some elements for a screenshot.
    const elementsToHide: NodeListOf<HTMLElement> = document.querySelectorAll(hideClasses);
    const elementsArray: HTMLElement[] = Array.from(elementsToHide);

    elementsArray.forEach((element) => {
      element.dataset.display = getComputedStyle(element).display;
      element.style.display = 'none';
    });

    // Create a screenshot.
    const screenshot = await html2canvas(document.body);

    // Revert items back to their original state.
    elementsArray.forEach((element) => {
      if (element.dataset.display) {
        element.style.display = element.dataset.display;
      }
    });

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
      <div className='copyright'>{window.location.host}</div>
    </div>
  );
};

export default Sidebar;
