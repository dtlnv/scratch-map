import { useEffect, useState } from "react";

interface useActiveRegionInterface {
    saveRegions: Function;
    name: string;
}

const useActiveRegions = ({ saveRegions, name }: useActiveRegionInterface) => {
    const [activeRegions, setActiveRegions] = useState<{ [key: string]: string }[]>([]);

    /**
     * Hide the color picker when new map is loaded.
     */
    useEffect(() => {
        setActiveRegions([]);
    }, [name]);

    /**
     * Remove all '.active' classes.
     * If there is a new active region, add class '.active',
     * otherwise hide the color picker.
     */
    useEffect(() => {
        const activesRegionPath: NodeListOf<SVGClipPathElement> = document.querySelectorAll('.map-container .active');
        activesRegionPath.forEach((element: SVGClipPathElement) => {
            element.classList.remove('active');
        });

        for (let region of activeRegions) {
            const newActive: HTMLDivElement | null = document.querySelector(`#${region.id}`);
            newActive?.classList.add('active');
        }
    }, [activeRegions]);

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
            if (target.tagName === 'path' && 'id' in target) {
                if (!target.classList.contains('active')) {
                    setActiveRegions(prev => {
                        if (prev.find(region => region.id === target.id)) {
                            return prev.filter(region => region.id !== target.id)
                        } else {
                            return [...prev, { id: target.id, title: target.getAttribute('title') || '' }]
                        }
                    });
                } else {
                    setActiveRegions(prev => prev.filter(region => region.id !== target.id))
                }
                return;
            }
            setActiveRegions([])
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
        saveRegions(activeRegions.map(region => region.id), color);

        const activesRegion: NodeListOf<SVGClipPathElement> = document.querySelectorAll('.map-container .active');
        activesRegion.forEach((element: SVGClipPathElement) => {
            element.classList.remove('active');
        });
        setActiveRegions([]);
    };

    const hideColorPicker = () => {
        setActiveRegions([]);

    }

    return { activeRegions, selectColorAction, hideColorPicker };
};

export default useActiveRegions;