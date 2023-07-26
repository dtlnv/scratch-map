import React, { useEffect, useState } from 'react';
import Map from './Map';
import ColorPicker from './ColorPicker';

interface MapContainerInterface {
  name: string;
  selections: { [key: string]: string | null } | null;
  saveRegion: Function;
}

const MapContainer: React.FC<MapContainerInterface> = ({ name, selections, saveRegion }) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(true);
  const [activeRegion, setActiveRegion] = useState<{ [key: string]: string } | null>(null);

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
      const newActive: HTMLDivElement | null = document.querySelector(`#${activeRegion.id}`);
      newActive?.classList.add('active');
    } else {
      setShowColorPicker(false);
    }
  }, [activeRegion]);

  useEffect(() => {
    /**
     * Clicking on the map will set a new active region.
     * Clicking on somewhere else will remove the active region and hide the color picker.
     */
    function clickAction(e: MouseEvent): void {
      const target = e.target as HTMLElement;

      if (target.closest('.color-picker')) {
        e.preventDefault();
        return;
      }

      // Make current element (region) active
      if (target.tagName === 'path' && 'id' in target && !target.classList.contains('active')) {
        setActiveRegion({ id: target.id, title: target.getAttribute('title') || '' });
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
   * Color picker callback function.
   * Save current data in the storage.
   * @param color string | null
   */
  const selectColorAction = (color: string | null) => {
    const active: HTMLDivElement | null = document.querySelector(`#${activeRegion?.id}`);

    if (activeRegion && (color || (!color && selections?.[activeRegion?.id]))) {
      saveRegion(activeRegion.id, color);
    }

    setActiveRegion(null);
    if (active && !color) {
      active.removeAttribute('class');
    }
  };

  return (
    <div className='map-container'>
      <ColorPicker hoverTitle={activeRegion?.title} selectColor={selectColorAction} show={showColorPicker} />
      <Map name={name} selections={selections} />
    </div>
  );
};

export default MapContainer;
