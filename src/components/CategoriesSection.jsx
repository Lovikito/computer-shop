import { ProductCard } from "./ProductCard"
import pc1 from '../assets/pc1.png'
import styles from './CategoriesSection.module.css'

export function CategoriesSection (){
    return (
        <section className={styles.section}>
            <header>
                <span>Explora</span>
                <h2>Compra por categoría</h2>
            </header>
            <div className={styles.categoryCard}>
                <article className={styles.visual}>
                    <img src={pc1} alt="" />
                </article>
                <span>PCs de escritorio</span>
            </div>
        </section>
    )
}