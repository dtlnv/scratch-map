import React, { useEffect, useState } from 'react';

interface MapInterface {
  name: string;
}

const Map: React.FC<MapInterface> = ({ name }) => {
  const [SvgComponent, setSvgComponent] = useState<React.FunctionComponent<React.SVGAttributes<SVGElement>> | null>(null);
  const [viewBox, setViewBox] = useState<string>('0 0 0 0');

  useEffect(() => {
    import(`../../assets/svg-maps/${name}.svg`).then((module) => {
      setSvgComponent(() => module.default);
    });
  }, []);

  useEffect(() => {
    const svgElement = document.querySelector('.map-container svg > g');
    const rect = svgElement?.getBoundingClientRect();
    console.log('rect', rect);

    if (rect) {
      // setViewBox(`0 0 ${rect?.width + 169} ${rect?.height + 316}`);
      setViewBox(`0 0 ${rect?.width} ${rect?.height * 1.5}`);
    }
  }, [SvgComponent]);

  return SvgComponent && <SvgComponent viewBox={viewBox} width='791.97px' height='1030.2px' preserveAspectRatio='xMidYMid meet' />;
};

export default Map;
