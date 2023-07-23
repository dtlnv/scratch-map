import React, { useState } from 'react';
import './MapContainer.scss';
import Map from './Map';
import ColorPicker from '../ColorPicker/ColorPicker';

interface MapContainerInterface {
  name: string;
}

const MapContainer: React.FC<MapContainerInterface> = ({ name }) => {
  const [hoverTitle, setHoverTitle] = useState<string | null>('');
  const [showTitle, setShowTitle] = useState<boolean>(true);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(true);

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
      setShowTitle(false);
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
        console.log('titleElement', titleElement.scrollWidth);

        titleElement.style.top = `${e.clientY - 50}px`;
        titleElement.style.left = `${e.clientX - titleElement.scrollWidth / 2}px`;
      }
    }
  };

  return (
    <div className='map-container' onClick={clickAction} onMouseOver={hoverAction} onMouseMove={mouseMoveAction}>
      {hoverTitle && showTitle && <div className='title'>{hoverTitle}</div>}
      {showColorPicker && <ColorPicker />}
      <Map name={name} />
    </div>
  );
};

export default MapContainer;
