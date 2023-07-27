import React from 'react';
import { useActiveRegion, useHoverTitle, useSVGMap, useZoom } from './MapHooks';
import ColorPicker from './ColorPicker';

interface MapInterface {
  name: string;
  selections: { [key: string]: string | null } | null;
  saveRegion: Function;
}

const Map: React.FC<MapInterface> = ({ name, selections, saveRegion }) => {
  const [hoverTitle] = useHoverTitle();
  const { handleZoomIn, handleZoomOut, handleMouseDown, handleMouseMove, handleMouseUp, scale, reset, translateX, translateY } = useZoom();
  const { SvgComponent, viewBox } = useSVGMap({ name, selections, reset });
  const { activeRegion, selectColorAction, showColorPicker } = useActiveRegion({ selections, saveRegion, name });

  return (
    <div className='map-container'>
      {showColorPicker && <ColorPicker hoverTitle={activeRegion?.title} selectColor={selectColorAction} />}
      {SvgComponent && (
        <>
          <div className='map-tools-buttons'>
            <button className='map-tool' onClick={handleZoomOut}>
              -
            </button>
            <button className='map-tool' onClick={() => reset()}>
              •
            </button>
            <button className='map-tool' onClick={handleZoomIn}>
              +
            </button>
            <div className='map-tool title'>{hoverTitle}</div>
          </div>
          <SvgComponent
            viewBox={viewBox}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)` }}
            preserveAspectRatio='xMidYMid meet'
          />
        </>
      )}
    </div>
  );
};

export default Map;
