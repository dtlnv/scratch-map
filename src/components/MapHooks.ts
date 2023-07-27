import { useEffect, useState } from "react";

export const useZoom = () => {
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

export const useHoverTitle = () => {
    const [hoverTitle, setHoverTitle] = useState<string | null>(null);

    useEffect(() => {
        /**
         * Update a region title.
         */
        function hoverAction(e: MouseEvent): void {
            const target = e.target as HTMLDivElement;
            if (target.tagName === 'path' && target.getAttribute('title')) {
                const title: string | null = target.getAttribute('title');
                setHoverTitle(title);
            } else if (target.tagName === 'svg') {
                setHoverTitle('');
            }
        }

        document.addEventListener('mouseover', hoverAction);

        return () => {
            document.removeEventListener('mouseover', hoverAction);
        };
    }, []);

    return [hoverTitle]
}


interface useSVGMapInterface {
    name: string;
    selections: { [key: string]: string | null } | null;
    reset: Function;
}

export const useSVGMap = ({ name, selections, reset }: useSVGMapInterface) => {
    const [SvgComponent, setSvgComponent] = useState<React.FunctionComponent<React.SVGAttributes<SVGElement>> | null>(null);
    const [viewBox, setViewBox] = useState<string>('0 0 0 0');

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

    return { SvgComponent, viewBox };
};


interface useActiveRegionInterface {
    selections: { [key: string]: string | null } | null;
    saveRegion: Function;
    name: string;
}

export const useActiveRegion = ({ selections, saveRegion, name }: useActiveRegionInterface) => {
    const [showColorPicker, setShowColorPicker] = useState<boolean>(true);
    const [activeRegion, setActiveRegion] = useState<{ [key: string]: string } | null>(null);

    /**
     * Hide the color picker when new map is loaded.
     */
    useEffect(() => {
        setShowColorPicker(false);
    }, [name]);

    /**
     * Remove all '.active' classes.
     * If there is a new active region, add class '.active',
     * otherwise hide the color picker.
     */
    useEffect(() => {
        const activesRegion: NodeListOf<SVGClipPathElement> = document.querySelectorAll('.map-container .active');
        activesRegion.forEach((element: SVGClipPathElement) => {
            element.classList.remove('active');
        });

        if (activeRegion) {
            setShowColorPicker(true);
            const newActive: HTMLDivElement | null = document.querySelector(`#${activeRegion.id}`);
            newActive?.classList.add('active');
        } else {
            setShowColorPicker(false);
        }
    }, [activeRegion]);

    useEffect(() => {
        /**
         * Clicking on the map will set a new active region.
         * Clicking on somewhere else will remove the active region and hide the color picker.
         */
        function clickAction(e: MouseEvent): void {
            const target = e.target as HTMLElement;

            if (target.closest('.color-picker')) {
                e.preventDefault();
                return;
            }

            // Make current element (region) active
            if (target.tagName === 'path' && 'id' in target && !target.classList.contains('active')) {
                setActiveRegion({ id: target.id, title: target.getAttribute('title') || '' });
                return;
            }

            setActiveRegion(null);
            setShowColorPicker(false);
        }

        document.addEventListener('click', clickAction);

        return () => {
            document.removeEventListener('click', clickAction);
        };
    }, []);

    /**
     * Color picker callback function.
     * Save current data in the storage.
     * @param color string | null
     */
    const selectColorAction = (color: string | null) => {
        const active: HTMLDivElement | null = document.querySelector(`#${activeRegion?.id}`);

        if (activeRegion && (color || (!color && selections?.[activeRegion?.id]))) {
            saveRegion(activeRegion.id, color);
        }

        setActiveRegion(null);
        if (active && !color) {
            active.removeAttribute('class');
        }
    };
    return { activeRegion, selectColorAction, showColorPicker };
};