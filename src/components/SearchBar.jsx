import { IconSearch, IconX } from '@tabler/icons-react'
import styles from './SearchBar.module.css'

export function SearchBar({value, onChange, onClear, className= '', autoFocus = false, clearLabel = 'Limpiar busqueda'}){
    return(
        <form className={className} role="search" onSubmit={(e) => e.preventDefault()}>
            <IconSearch size={18} className={styles.searchIcon} />
            <input 
                type="text" 
                placeholder="Buscar PCs configuradas, productos..." 
                className={styles.searchInput}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoFocus={autoFocus}
            />
            <button type="button" className={styles.searchClearBtn} aria-label={clearLabel} onClick={onClear}>
                <IconX size={16} />
            </button>
        </form>
    )
}