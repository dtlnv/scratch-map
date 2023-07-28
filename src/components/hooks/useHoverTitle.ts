import { useEffect, useState } from "react";

const useHoverTitle = () => {
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

export default useHoverTitle;
