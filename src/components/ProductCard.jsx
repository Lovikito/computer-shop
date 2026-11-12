import styles from './ProductCard.module.css'

export function ProductCard({ product }) {
    return (
        <article className={styles.card}>
            <img className={styles.image} src={product.image} alt={product.alt} />
            <h3 className={styles.name}>{product.name}</h3>

            <div className={styles.prices}>
                <span className={styles.currentPrice}>
                    <strong>{product.actualPrice}</strong>
                </span>
                <span className={styles.oldPrice}>
                    <s>{product.oldPrice}</s>
                </span>
            </div>

            <button type="button" className={styles.buyButton}>
                Comprar
            </button>
        </article>
    )
}
