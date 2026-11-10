import { useState, useEffect } from 'react';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

export function useTheme() {
    const [theme, setTheme] = useState(getInitialTheme);
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    useEffect(() => {
        const mq = window.matchMedia(DARK_QUERY);
        const onChange = (e) => {
            if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
        };
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);
    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('theme', next);
    };
    return { theme, toggleTheme };
}