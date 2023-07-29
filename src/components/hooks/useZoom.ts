import { useState } from "react";

/**
 * Hook to zoom and drag the map.
 * @returns {object}
 * {
 *      handleZoom - Function for zoom.
 *      handleMouseDown - Function for drag the map.
 *      handleMouseMove - Function for drag the map.
 *      handleMouseUp - Function for drag the map.
 *      reset - Set the initial states.
 *      scale - The current zoom level. 
 *      translateX - The current position X.
 *      translateY - The current position Y.
 * }
 */
const useZoom = () => {
    const [scale, setScale] = useState<number>(1);
    const [translateX, setTranslateX] = useState<number>(0);
    const [translateY, setTranslateY] = useState<number>(0);
    const [startX, setStartX] = useState<number>(0);
    const [startY, setStartY] = useState<number>(0);
    const [dragging, setDragging] = useState<boolean>(false);
    const STEP = 0.3;

    // Zoom in or out.
    const handleZoom = (direction: 'in' | 'out') => {
        setScale(direction === 'in' ? scale + STEP : scale - STEP);
    };

    // Start dragging a map.
    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setDragging(true);
        let clientX: number;
        let clientY: number;
        if ('clientX' in e) {
            clientX = e.clientX;
            clientY = e.clientY;
        } else if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            return;
        }

        setStartX(clientX - translateX);
        setStartY(clientY - translateY);
    };

    // Dragging a map.
    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (dragging) {
            let clientX: number;
            let clientY: number;
            if ('clientX' in e) {
                clientX = e.clientX;
                clientY = e.clientY;
            } else if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                return;
            }

            setTranslateX(clientX - startX);
            setTranslateY(clientY - startY);
        }
    };

    // Stop dragging a map.
    const handleMouseUp = () => {
        setDragging(false);
    };

    // Reset to initial state.
    const reset = () => {
        setScale(1);
        setDragging(false);
        setStartX(0);
        setStartY(0);
        setTranslateX(0);
        setTranslateY(0);
    };

    return { handleZoom, handleMouseDown, handleMouseMove, handleMouseUp, scale, reset, translateX, translateY };
};

export default useZoom;
