import pc1 from '../assets/pc1.png'
import styles from './HeroSection.module.css'
import typography from './Typography.module.css'

export function HeroSection() {
    return (
        <section className={styles.section} aria-labelledby="hero-title">
            <div className={styles.content}>
                <span className={typography.label}>Nueva colección 2026</span>
                <h1 id="hero-title" className={typography.title}>
                    La computadora que necesitas,{' '}
                    <span className={styles.titleGradient}>lista para rendir.</span>
                </h1>
                <p className={styles.description}>
                    Equipos para trabajo, estudio y gaming, con garantía, soporte
                    técnico y financiamiento en cuotas.
                </p>
                <div className={styles.actions}>
                    <button type="button" className={styles.btnPrimary}>
                        Comprar ahora
                    </button>
                    <button type="button" className={styles.btnSecondary}>
                        Arma tu PC
                    </button>
                </div>
            </div>

            <div className={styles.visual}>
                <img src={pc1} alt="" />
            </div>
        </section>
    )
}
