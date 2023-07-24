import React, { useEffect, useState } from 'react';

interface MapInterface {
  name: string;
  selections: { [key: string]: string | null } | null;
}

const Map: React.FC<MapInterface> = ({ name, selections }) => {
  const [SvgComponent, setSvgComponent] = useState<React.FunctionComponent<React.SVGAttributes<SVGElement>> | null>(null);
  const [viewBox, setViewBox] = useState<string>('0 0 0 0');

  useEffect(() => {
    import(`../assets/svg-maps/${name}.svg`).then((module) => {
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

        if (selections) {
          for (let region in selections) {
            const regionArea: HTMLDivElement | null = document.querySelector(`#${region}`);
            const color: string | null = selections[region];
            if (regionArea && color) {
              regionArea.setAttribute('class', color);
            }
          }
        }
      }
    }
  }, [SvgComponent]);

  return SvgComponent && <SvgComponent viewBox={viewBox} preserveAspectRatio='xMidYMid meet' />;
};

export default Map;
