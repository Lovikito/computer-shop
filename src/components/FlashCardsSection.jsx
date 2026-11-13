import { FlashCard } from "./FlashCard"
import styles from './FlashCardsSection.module.css'

export function FlashCardsSection() {
    return (
        <section className={styles.sectionFlashCards}>
                <FlashCard 
                span={'Oferta del mes'}
                title={'Laptops para trabajo y estudio'}
                details={'Hasta 25% de descuento y cuotas sin intereses.'}
                button={'Ver ofertas'}
                sectionStyle={'sectionLight'}
                />

                <FlashCard 
                span={'Look Gamer'}
                title={'Potencia sin límites con tu próxima PC gamer'}
                details={'Tarjetas gráficas de última generación.'}
                button={'Explorar'}
                sectionStyle={'sectionDark'}
                />
        </section>
    )
}