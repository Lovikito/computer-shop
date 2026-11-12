import { useRef, useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { products } from '../data/products.js'
import { ProductCard } from './ProductCard.jsx'
import styles from './OffersCarousel.module.css'
import typography from './Typography.module.css'

const benefits = [
    'Envío rápido',
    'Garantía en todos los equipos',
    'Hasta 12 cuotas sin intereses',
    'Soporte técnico especializado',
]

export function OffersCarousel() {
    const carouselRef = useRef(null)
    const [canGoForward, setCanGoForward] = useState(true)
    const [canGoBack, setCanGoBack] = useState(false)

    function moveCarousel(direction) {
        const carousel = carouselRef.current
        if (!carousel) return

        const firstCard = carousel.querySelector('li')
        const track = carousel.querySelector('ul')
        if (!firstCard || !track) return

        const gap = parseFloat(getComputedStyle(track).columnGap)
        const cardWidth = firstCard.getBoundingClientRect().width

        carousel.scrollBy({
            left: direction * (cardWidth + gap),
            behavior: 'smooth',
        })
    }

    function updateCarouselControls() {
        const carousel = carouselRef.current
        if (!carousel) return

        const atStart = carousel.scrollLeft <= 6
        const atEnd =
            carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1

        setCanGoBack(!atStart)
        setCanGoForward(!atEnd)
    }

    return (
        <section className={styles.section} aria-labelledby="offers-title">
            <header className={styles.header}>
                <div>
                    <span className={typography.label}>Ofertas de la semana</span>
                    <h2 id="offers-title" className={typography.title}>
                        Precios que no se repiten.
                    </h2>
                </div>
                <p className={styles.countdown}>Termina en: 02d 14h 36m</p>
            </header>

            <div className={styles.carouselFrame}>
                <div
                    id="offers-carousel"
                    ref={carouselRef}
                    className={styles.viewport}
                    onScroll={updateCarouselControls}
                    role="region"
                    aria-label="Computadoras en oferta"
                    tabIndex={0}
                >
                    <ul className={styles.track}>
                        {products.map((product) => (
                            <li className={styles.item} key={product.id}>
                                <ProductCard product={product} />
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    className={`${styles.arrow} ${styles.previousArrow}`}
                    type="button"
                    aria-label="Ver computadoras anteriores"
                    aria-controls="offers-carousel"
                    disabled={!canGoBack}
                    onClick={() => moveCarousel(-1)}
                >
                    <IconChevronLeft aria-hidden="true" stroke={1} />
                </button>

                <button
                    className={`${styles.arrow} ${styles.nextArrow}`}
                    type="button"
                    aria-label="Ver más computadoras"
                    aria-controls="offers-carousel"
                    disabled={!canGoForward}
                    onClick={() => moveCarousel(1)}
                >
                    <IconChevronRight aria-hidden="true" stroke={1} />
                </button>
            </div>

            <footer className={styles.footer}>
                <ul>
                    {benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                    ))}
                </ul>
            </footer>
        </section>
    )
}
