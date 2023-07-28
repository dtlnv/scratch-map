import { useState } from "react";

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

export default useZoom;