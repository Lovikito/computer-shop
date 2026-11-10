import { IconSun, IconMoon } from "@tabler/icons-react";
import styles from './ButtonThemeToggle.module.css'

export function ButtonThemeToggle({ theme, onToggle, className = '' }) {
    const isDark = theme === 'dark';

    return (
        <button type="button" className={`${styles.themeToggleBtn} ${className}`} aria-label="Cambiar tema" aria-pressed={isDark} onClick={onToggle}>
            {isDark ? <IconMoon size={20} stroke={1.5} /> : <IconSun size={20} stroke={1.5} />}
        </button>
    )
}