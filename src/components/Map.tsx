import React, { useEffect, useState } from 'react';

interface MapInterface {
  name: string;
  selections: { [key: string]: string | null } | null;
}

const useZoom = () => {
  const [scale, setScale] = useState<number>(1);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const step = 0.3;

  const handleZoomIn = () => {
    setScale(scale + step);
  };

  const handleZoomOut = () => {
    setScale(scale - step);
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setDragging(true);
    setStartX(e.clientX - translateX);
    setStartY(e.clientY - translateY);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (dragging) {
      setTranslateX(e.clientX - startX);
      setTranslateY(e.clientY - startY);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const reset = () => {
    setScale(1);
    setDragging(false);
    setStartX(0);
    setStartY(0);
    setTranslateX(0);
    setTranslateY(0);
  };

  return { handleZoomIn, handleZoomOut, handleMouseDown, handleMouseMove, handleMouseUp, scale, reset, translateX, translateY };
};

const Map: React.FC<MapInterface> = ({ name, selections }) => {
  const [SvgComponent, setSvgComponent] = useState<React.FunctionComponent<React.SVGAttributes<SVGElement>> | null>(null);
  const [viewBox, setViewBox] = useState<string>('0 0 0 0');
  const { handleZoomIn, handleZoomOut, handleMouseDown, handleMouseMove, handleMouseUp, scale, reset, translateX, translateY } = useZoom();

  useEffect(() => {
    import(`../assets/svg-maps/${name}.svg`).then((module) => {
      setSvgComponent(() => module.default);
    });
    reset();
  }, [name]);

  useEffect(() => {
    if (selections && Object.keys(selections).length > 0) {
      for (let region in selections) {
        const regionArea: HTMLDivElement | null = document.querySelector(`#${region}`);
        const color: string | null = selections[region];
        if (regionArea && color) {
          regionArea.setAttribute('class', color);
        }
      }
    } else {
      const allRegions: NodeListOf<Element> | null = document.querySelectorAll(`.map-container svg path[class]`);
      allRegions.forEach((element) => {
        element.removeAttribute('class');
      });
    }
  }, [SvgComponent, selections]);

  useEffect(() => {
    const svgElement: HTMLDivElement | null = document.querySelector('.map-container svg');
    if (svgElement) {
      const width: string | null = svgElement?.getAttribute('width');
      const height: string | null = svgElement?.getAttribute('height');
      if (width && height) {
        setViewBox(`0 0 ${width} ${height}`);
        svgElement.removeAttribute('width');
        svgElement.removeAttribute('height');
      }
    }
  }, [SvgComponent]);

  return (
    SvgComponent && (
      <>
        <div className='zoom-buttons'>
          <button onClick={handleZoomIn}>+</button>
          <button onClick={() => reset()}>•</button>
          <button onClick={handleZoomOut}>-</button>
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
    )
  );
};

export default Map;
