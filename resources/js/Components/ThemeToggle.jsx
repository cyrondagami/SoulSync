import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'dark';
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    return [theme, setTheme];
}

export default function ThemeToggle({ className = '' }) {
    const [theme, setTheme] = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:text-indigo-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-300 dark:hover:text-white ${className}`}
        >
            {isDark ? (
                <Sun className="h-5 w-5 transition duration-300 group-hover:rotate-45" />
            ) : (
                <Moon className="h-5 w-5 transition duration-300 group-hover:-rotate-12" />
            )}
        </button>
    );
}