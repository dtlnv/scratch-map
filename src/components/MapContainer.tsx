import React, { useEffect, useState } from 'react';
import Map from './Map';
import ColorPicker from './ColorPicker';

interface MapContainerInterface {
  name: string;
  selections: { [key: string]: string | null } | null;
  saveRegion: Function;
}

const MapContainer: React.FC<MapContainerInterface> = ({ name, selections, saveRegion }) => {
  const [hoverTitle, setHoverTitle] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(true);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const titleElement: HTMLDivElement | null = document.querySelector('.title');

  /**
   * Hide the color picker when new map is loaded.
   */
  useEffect(() => {
    setShowColorPicker(false);
  }, [name]);

  /**
   * Remove all '.active' classes.
   * If there is a new active region, add class '.active',
   * otherwise hide the color picker.
   */
  useEffect(() => {
    const activesRegion: NodeListOf<SVGClipPathElement> = document.querySelectorAll('.map-container .active');
    activesRegion.forEach((element: SVGClipPathElement) => {
      element.classList.remove('active');
    });

    if (activeRegion) {
      setShowColorPicker(true);
      const newActive: HTMLDivElement | null = document.querySelector(`#${activeRegion}`);
      newActive?.classList.add('active');
    } else {
      setShowColorPicker(false);
    }
  }, [activeRegion]);

  /**
   * Clicking on the map will set a new active region.
   * Clicking on somewhere else will remove the active region and hide the color picker.
   */
  useEffect(() => {
    function clickAction(e: MouseEvent): void {
      const target = e.target as HTMLElement;

      if (target.closest('.color-picker')) {
        e.preventDefault();
        return;
      }

      // Make current element (region) active
      if (target.tagName === 'path' && 'id' in target && !target.classList.contains('active')) {
        setActiveRegion(target.id);
        const colorPicker: HTMLDivElement | null = document.querySelector('.color-picker');
        if (colorPicker) {
          colorPicker.style.top = `${e.pageY - 50}px`;
          colorPicker.style.left = `${e.pageX - colorPicker.scrollWidth / 2}px`;
        }
        return;
      }

      setActiveRegion(null);
      setShowColorPicker(false);
    }

    document.addEventListener('click', clickAction);

    return () => {
      document.removeEventListener('click', clickAction);
    };
  }, []);

  /**
   * Update a region title.
   */
  const hoverAction = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.tagName === 'path' && target.getAttribute('title')) {
      const title: string | null = target.getAttribute('title');
      setHoverTitle(title);
    } else {
      setHoverTitle('');
    }
  };

  /**
   * Move the region title with a mouse.
   */
  const mouseMoveAction = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.tagName === 'path' && target.getAttribute('title')) {
      if (titleElement) {
        titleElement.style.top = `${e.pageY - 50}px`;
        titleElement.style.left = `${e.pageX - titleElement.scrollWidth / 2}px`;
      }
    }
  };

  /**
   * Color picker callback function.
   * Save current data in the storage.
   * @param color string | null
   */
  const selectColorAction = (color: string | null) => {
    const active: HTMLDivElement | null = document.querySelector(`#${activeRegion}`);

    if (activeRegion && (color || (!color && selections?.[activeRegion]))) {
      saveRegion(activeRegion, color);
    }

    setActiveRegion(null);
    if (active) {
      if (color) {
        active.setAttribute('class', color);
      } else {
        active.removeAttribute('class');
      }
    }
  };

  return (
    <div className='map-container' onMouseOver={hoverAction} onMouseMove={mouseMoveAction}>
      <div className='title' style={{ display: hoverTitle ? 'flex' : 'none' }}>
        {hoverTitle}
      </div>
      <ColorPicker selectColor={selectColorAction} show={showColorPicker} />
      <Map name={name} selections={selections} />
    </div>
  );
};

export default MapContainer;
