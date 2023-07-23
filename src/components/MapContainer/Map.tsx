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
  }, [name]);

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

  return SvgComponent && <SvgComponent viewBox={viewBox} preserveAspectRatio='xMidYMid meet' />;
};

export default Map;
