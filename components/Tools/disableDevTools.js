import { useEffect } from 'react';

const DisableDevTools = () => {

    useEffect(() => {
        const listener = (event) => {
            // Check for specific shortcut keys
            if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
                // Prevent default behavior for Ctrl+Shift+I
                event.preventDefault();
            } else if (event.keyCode === 123) {
                // Prevent default behavior for F12
                event.preventDefault();
            }
        };

        document.addEventListener('keydown', listener);

        return () => document.removeEventListener('keydown', listener);
    }, []);
}

export default DisableDevTools;