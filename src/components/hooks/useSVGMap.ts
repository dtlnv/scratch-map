import { useEffect, useState } from "react";

interface useSVGMapInterface {
    name: string;
    selections: { [key: string]: string | null } | null;
    reset: Function;
}

const useSVGMap = ({ name, selections, reset }: useSVGMapInterface) => {
    const [SvgComponent, setSvgComponent] = useState<React.FunctionComponent<React.SVGAttributes<SVGElement>> | null>(null);
    const [viewBox, setViewBox] = useState<string>('0 0 0 0');

    useEffect(() => {
        import(`../../assets/svg-maps/${name}.svg`).then((module) => {
            setSvgComponent(() => module.default);
        });
        reset();
    }, [name]);

    useEffect(() => {
        const allRegions: NodeListOf<Element> | null = document.querySelectorAll(`.map-container svg path[class]`);
        allRegions.forEach((element) => {
            element.removeAttribute('class');
        });

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
