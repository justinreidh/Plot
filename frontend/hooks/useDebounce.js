import { useEffect, useState } from 'react';

export function useDebounce(value) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, 10000);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
}
