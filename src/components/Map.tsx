import React from 'react';
import ColorPicker from './ColorPicker';
import { useActiveRegions, useHoverTitle, useSVGMap, useZoom } from './hooks';

interface MapInterface {
  name: string;
  selections: { [key: string]: string | null } | null;
  saveRegions: Function;
}

const Map: React.FC<MapInterface> = ({ name, selections, saveRegions }) => {
  const [hoverTitle] = useHoverTitle();
  const { handleZoomIn, handleZoomOut, handleMouseDown, handleMouseMove, handleMouseUp, scale, reset, translateX, translateY } = useZoom();
  const { SvgComponent, viewBox } = useSVGMap({ name, selections, reset });
  const { activeRegions, selectColorAction, hideColorPicker } = useActiveRegions({ saveRegions, name });

  if (!SvgComponent) return;

  return (
    <div className='map-container'>
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
    </div>
  );
};

export default Map;
