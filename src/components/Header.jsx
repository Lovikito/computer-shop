import { useState } from 'react';
import { useHeaderPanels } from '../hooks/useHeaderPanels';
import { 
    IconTopologyStarRing3, 
    IconSearch, 
    IconChevronDown,
    IconX,
    IconTool,
    IconUser,
    IconShoppingBag,
    IconMenu2,
} from '@tabler/icons-react';
import { ButtonThemeToggle } from './ButtonThemeToggle';
import { SearchBar } from './SearchBar';
import styles from './Header.module.css';

export function Header ({ theme, onToggleTheme }) {
    const { isMenuOpen, isSearchOpen, toggleMenu, toggleSearch, closeMenu, closeSearch, } = useHeaderPanels()
    const [query, setQuery] = useState('')

    return (
        <>
        <header className={styles.header}>
            <div className={styles.headerMainRow}>
                {/* Lado Izquierdo: Menú Hamburguesa + Logo */}
                <div className={styles.headerLeft}>
                    <button 
                        type="button" 
                        className={styles.menuToggleBtn} 
                        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                    </button>

                    <div className={styles.headerBrand}>
                        <IconTopologyStarRing3 size={36} stroke={1.5} className={styles.brandLogoIcon} />
                        <div className={styles.brandText}>
                            <span className={styles.brandTitle}>COMPUTER SHOP</span>
                            <span className={styles.brandSubtitle}>PERÚ HARDWARE HUB</span>
                        </div>
                    </div>
                </div>

                {/* Barra de búsqueda (Desktop) */}
                <SearchBar
                    className={styles.headerSearchBar}
                    value={query}
                    onChange={setQuery}
                    onClear={() => setQuery('')}
                />

                {/* Navegación principal (Desktop) */}
                <nav className={styles.headerNav}>
                    <a href="#catalogo" className={styles.navLink}>Catálogo PCs</a>

                    <a href="#arma-tu-pc" className={styles.navLinkFeatured}>
                        <IconTool size={16} className={styles.featuredIcon} />
                        <span>Arma tu PC</span>
                        <span className={styles.badgePro}>PRO</span>
                    </a>

                    <a href="#ofertas" className={styles.navLink}>Ofertas</a>
                </nav>

                {/* Acciones de usuario */}
                <span className={styles.headerActions}>
                    {/* Botón Lupa (Solo Mobile) */}
                    <button 
                        type="button" 
                        className={styles.mobileSearchBtn} 
                        aria-label="Abrir buscador"
                        onClick={toggleSearch}
                    >
                        <IconSearch size={20} stroke={1.5} />
                    </button>

                    {/* Botón cambiar tema (Desktop) */}
                    <ButtonThemeToggle theme={theme} onToggle={onToggleTheme} className={styles.desktopOnly} />

                    {/* Botón Mi Cuenta */}
                    <button type="button" className={styles.accountBtn} aria-label="Mi Cuenta">
                        <span className={styles.accountAvatar}>
                            <IconUser size={16} />
                        </span>
                        <span className={styles.accountName}>Mi Cuenta</span>
                        <IconChevronDown size={14} className={styles.accountChevron} />
                    </button>

                    {/* Botón Carrito */}
                    <button type="button" className={styles.cartBtn} aria-label="Carrito de compras">
                        <div className={styles.cartIconContainer}>
                            <IconShoppingBag size={20} />
                            <span className={styles.cartBadge}>2</span>
                        </div>
                        <div className={styles.cartText}>
                            <span className={styles.cartLabel}>CARRITO</span>
                            <strong className={styles.cartAmount}>S/. 8,450.00</strong>
                        </div>
                    </button>
                </span>
            </div>

            {/* Buscador desplegable en Mobile */}
            {isSearchOpen && (
                <div className={styles.mobileSearchDropdown}>
                    <SearchBar
                        className={styles.mobileSearchForm}
                        value={query}
                        onChange={setQuery}
                        autoFocus
                        clearLabel="Cerrar búsqueda"
                        onClear={() => {
                            setQuery('');
                            closeSearch();
                        }}
                    />
                </div>
            )}

            {/* Menú desplegable Mobile (Contiene catálogo, arma tu pc, ofertas y modo dark/light) */}
            {isMenuOpen && (
                    <nav className={styles.mobileNav}>
                        <a 
                            href="#catalogo" 
                            className={styles.mobileNavLink} 
                            onClick={closeMenu}
                        >
                            Catálogo PCs
                        </a>

                        <a 
                            href="#arma-tu-pc" 
                            className={styles.mobileNavLinkFeatured} 
                            onClick={closeMenu}
                        >
                            <div className={styles.featuredContent}>
                                <IconTool size={18} className={styles.featuredIcon} />
                                <span>Arma tu PC</span>
                            </div>
                            <span className={styles.badgePro}>PRO</span>
                        </a>

                        <a 
                            href="#ofertas" 
                            className={styles.mobileNavLink} 
                            onClick={closeMenu}
                        >
                            Ofertas
                        </a>

                        <div className={styles.mobileMenuDivider}></div>

                        {/* Modo Dark/Light dentro del menú hamburguesa */}
                        <div className={styles.mobileThemeRow}>
                            <span className={styles.mobileThemeText}>Modo Claro / Oscuro</span>
                            <ButtonThemeToggle theme={theme} onToggle={onToggleTheme} />
                        </div>
                    </nav>
            )}
        </header>
        
        {/* Con esto el menu ahora toma en cuenta al header y se queda debajo de el con top: 100% sin tener que estar hardcodeando codigo en CSS */}
        {isMenuOpen && (
            <div
                className={styles.mobileMenuBackdrop}
                onClick={closeMenu}
                aria-hidden="true"
            />
        )}
    </>
    );
}
