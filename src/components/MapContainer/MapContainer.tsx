import React, { useEffect, useState } from 'react';
import './MapContainer.scss';
import Map from './Map';
import ColorPicker from '../ColorPicker/ColorPicker';

interface MapContainerInterface {
  name: string;
}

const MapContainer: React.FC<MapContainerInterface> = ({ name }) => {
  const [hoverTitle, setHoverTitle] = useState<string | null>('');
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(true);

  useEffect(() => {
    setShowColorPicker(false);
    setShowTitle(false);
  }, [name]);

  const clickAction = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGPathElement;

    // Remove previous active state
    const activesRegion: NodeListOf<SVGClipPathElement> = document.querySelectorAll('.map-container .active');
    activesRegion.forEach((element: SVGClipPathElement) => {
      element.classList.remove('active');
    });

    // Make current element (region) active
    if (target.tagName === 'path') {
      target.classList.add('active');
      setShowColorPicker(true);
      setShowTitle(false);
    } else {
      setShowColorPicker(false);
    }

    const colorPicker: HTMLDivElement | null = document.querySelector('.color-picker');
    if (colorPicker) {
      colorPicker.style.top = `${e.pageY - 50}px`;
      colorPicker.style.left = `${e.pageX - colorPicker.scrollWidth / 2}px`;
    }
  };

  const hoverAction = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setShowTitle(true);

    if (target.tagName === 'path' && target.getAttribute('title')) {
      const title: string | null = target.getAttribute('title');
      setHoverTitle(title);
    } else {
      setHoverTitle('');
    }
  };

  const mouseMoveAction = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.tagName === 'path' && target.getAttribute('title')) {
      const titleElement: HTMLDivElement | null = document.querySelector('.title');
      if (titleElement) {
        titleElement.style.top = `${e.pageY - 50}px`;
        titleElement.style.left = `${e.pageX - titleElement.scrollWidth / 2}px`;
      }
    }
  };

  return (
    <div className='map-container' onClick={clickAction} onMouseOver={hoverAction} onMouseMove={mouseMoveAction}>
      {hoverTitle && showTitle && <div className='title'>{hoverTitle}</div>}
      <ColorPicker show={showColorPicker} />
      <Map name={name} />
    </div>
  );
};

export default MapContainer;
