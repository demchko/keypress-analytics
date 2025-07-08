import { keypressStore } from '@/stores/KeyPressStore';
import { useEffect } from 'react';

export const useKeypress = () => {
    useEffect(() => {
        const handleKeypress = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.altKey || event.metaKey) return;

            keypressStore.sendKeypress(event.key, event.code);
        };

        window.addEventListener('keydown', handleKeypress);

        return () => {
            window.removeEventListener('keydown', handleKeypress);
        };
    }, []);
};