import { useState, useEffect } from 'react'

export function useHeaderPanels(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const menuMq = window.matchMedia('(min-width: 1021px)');
        const searchMq = window.matchMedia('(min-width: 611px)');
        const onMenu = (e) => e.matches && setIsMenuOpen(false);
        const onSearch = (e) => e.matches && setIsSearchOpen(false);
        menuMq.addEventListener('change', onMenu);
        searchMq.addEventListener('change', onSearch);
        return () => {
            menuMq.removeEventListener('change', onMenu);
            searchMq.removeEventListener('change', onSearch);
    }
}, []);

    const toggleMenu = () => {
        setIsMenuOpen((open) => !open)
        setIsSearchOpen(false)
    }

    const toggleSearch = () => {
        setIsSearchOpen((open) => !open)
        setIsMenuOpen(false)
    }

    const closeMenu = () => setIsMenuOpen(false)

    const closeSearch = () => setIsSearchOpen(false)

    return { isMenuOpen, isSearchOpen, toggleMenu, toggleSearch, closeMenu, closeSearch }

}