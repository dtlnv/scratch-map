import { useEffect, useState } from "react";

interface useSVGMapInterface {
    name: string;
    selections: { [key: string]: string | null } | null;
    reset: Function;
}

/**
 * Load and show the SVG map.
 * Set colors for saved regions.
 * @returns {object}
 */
const useSVGMap = ({ name, selections, reset }: useSVGMapInterface) => {
    const [SvgComponent, setSvgComponent] = useState<React.FunctionComponent<React.SVGAttributes<SVGElement>> | null>(null);
    const [viewBox, setViewBox] = useState<string>('0 0 0 0');

    // Import the SVG map by name.
    useEffect(() => {
        import(`../../assets/svg-maps/${name}.svg`).then((module) => {
            setSvgComponent(() => module.default);
        });
        reset();
    }, [name]);

    // Set colors for saved regions.
    useEffect(() => {
        // First remove all active elements.
        const allRegions: NodeListOf<Element> | null = document.querySelectorAll(`.map-container svg path[class]`);
        allRegions.forEach((element) => {
            element.removeAttribute('class');
        });

        // Then set the color class for the regions.
        if (selections && Object.keys(selections).length > 0) {
            for (let region in selections) {
                const regionArea: HTMLDivElement | null = document.querySelector(`#${region}`);
                const color: string | null = selections[region];
                if (regionArea && color) {
                    regionArea.setAttribute('class', color);
                }
            }
        }
    }, [SvgComponent, selections]);

    // Adjust the SVG map position.
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

    return { SvgComponent, viewBox };
};

export default useSVGMap;
