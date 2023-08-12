import { useState } from 'react';

/**
 * Hook to zoom and drag the map.
 * @returns {object}: UseZoomReturn
 */

interface UseZoomReturn {
  handleZoom: (direction: 'in' | 'out') => void; // Function for zoom.
  handleMouseDown: (e: React.MouseEvent | React.TouchEvent) => void; // Function for drag the map.
  handleMouseMove: (e: React.MouseEvent | React.TouchEvent) => void; // Function for drag the map.
  handleMouseUp: () => void; // Function for drag the map.
  reset: () => void; // Set the initial states.
  scale: number; // The current zoom level.
  translateX: number; // The current position X.
  translateY: number; // The current position Y.
}

const useZoom = (): UseZoomReturn => {
  const [scale, setScale] = useState<number>(1);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const STEP = 0.3;

  // Zoom in or out.
  const handleZoom = (direction: 'in' | 'out'): void => {
    setScale(direction === 'in' ? scale + STEP : scale - STEP);
  };

  // Start dragging a map.
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent): void => {
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
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent): void => {
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
  const handleMouseUp = (): void => {
    setDragging(false);
  };

  // Reset to initial state.
  const reset = (): void => {
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
