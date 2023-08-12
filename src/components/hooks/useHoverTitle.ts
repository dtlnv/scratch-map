import { useEffect, useState } from 'react';

/**
 * Hook to display the name of the hovered region.
 * @returns {array}
 */
const useHoverTitle = () => {
  const [hoverTitle, setHoverTitle] = useState<string>();

  // Update a region title.
  useEffect(() => {
    function hoverAction(e: MouseEvent): void {
      const target = e.target as HTMLDivElement;
      if (target.tagName === 'path' && target.getAttribute('title')) {
        const title: string | null = target.getAttribute('title');
        if (title) {
          setHoverTitle(title);
          return;
        }
      }
      setHoverTitle('');
    }

    document.addEventListener('mouseover', hoverAction);

    return () => {
      document.removeEventListener('mouseover', hoverAction);
    };
  }, []);

  return [hoverTitle];
};

export default useHoverTitle;
