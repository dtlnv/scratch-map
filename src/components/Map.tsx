import React, { useEffect } from 'react';
import { useActiveRegion, useHoverTitle, useSVGMap, useZoom } from './MapHooks';
import ColorPicker from './ColorPicker';

interface MapInterface {
  name: string;
  selections: { [key: string]: string | null } | null;
  saveRegions: Function;
}

const Map: React.FC<MapInterface> = ({ name, selections, saveRegions }) => {
  const [hoverTitle] = useHoverTitle();
  const { handleZoomIn, handleZoomOut, handleMouseDown, handleMouseMove, handleMouseUp, scale, reset, translateX, translateY } = useZoom();
  const { SvgComponent, viewBox } = useSVGMap({ name, selections, reset });
  const { activeRegions, selectColorAction, hideColorPicker } = useActiveRegion({ saveRegions, name });

  return (
    <div className='map-container'>
      {SvgComponent && (
        <>
          <div className='map-tools'>
            <div className='map-tools_zoom'>
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
          </div>
          <SvgComponent
            viewBox={viewBox}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            style={{ transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)` }}
            preserveAspectRatio='xMidYMid meet'
          />
          {activeRegions.length > 0 && (
            <ColorPicker
              label={activeRegions.length > 0 ? activeRegions.map((region) => region.title).join(', ') : ''}
              selectColor={selectColorAction}
              close={hideColorPicker}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Map;
