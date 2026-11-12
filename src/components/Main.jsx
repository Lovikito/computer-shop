import styles from './Main.module.css'
import { HeroSection } from './HeroSection.jsx'
import { OffersCarousel } from './OffersCarousel.jsx'
import { CategoriesSection } from './CategoriesSection.jsx'

export function Main() {
    return (
        <main className={styles.main}>
            <HeroSection />
            <OffersCarousel />
            <CategoriesSection />
        </main>
    )
}
