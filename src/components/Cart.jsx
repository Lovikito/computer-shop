import styles from './Cart.module.css'

const currencyFormatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
})

export function Cart({ items, onUpdateQuantity, onRemove }) {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0)
    const subtotal = items.reduce(
        (sum, item) =>
            sum + Math.max(item.price, item.compareAtPrice ?? item.price) * item.quantity,
        0
    )
    const discounts = items.reduce(
        (sum, item) =>
            sum + Math.max((item.compareAtPrice ?? item.price) - item.price, 0) * item.quantity,
        0
    )
    const shipping = 0
    const total = subtotal - discounts + shipping

    return (
        <section className={styles.cart} aria-labelledby="cart-title">
            <h2 id="cart-title" className={styles.title}>Carrito de compras</h2>
            <p className={styles.itemCount} aria-live="polite">
                {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
            </p>

            {items.length === 0 ? (
                <p className={styles.emptyMessage}>Tu carrito está vacío.</p>
            ) : (
                <div className={styles.content}>
                    <ul className={styles.items}>
                        {items.map((item) => (
                            <li className={styles.item} key={item.id}>
                                <div className={styles.product}>
                                    <h3 className={styles.productName}>{item.name}</h3>
                                    <p className={styles.unitPrice}>
                                        {currencyFormatter.format(item.price)} por unidad
                                    </p>
                                </div>

                                <div className={styles.itemActions}>
                                    <div className={styles.quantityControl} aria-label={`Cantidad de ${item.name}`}>
                                        <button
                                            type="button"
                                            className={styles.quantityButton}
                                            aria-label={`Disminuir cantidad de ${item.name}`}
                                            disabled={item.quantity <= 1}
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                        >
                                            −
                                        </button>
                                        <span className={styles.quantity} aria-live="polite">
                                            {item.quantity}
                                        </span>
                                        <button
                                            type="button"
                                            className={styles.quantityButton}
                                            aria-label={`Aumentar cantidad de ${item.name}`}
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className={styles.lineTotal}>
                                        {currencyFormatter.format(item.price * item.quantity)}
                                    </p>
                                    <button
                                        type="button"
                                        className={styles.removeButton}
                                        onClick={() => onRemove(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.summary}>
                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>{currencyFormatter.format(subtotal)}</span>
                        </div>
                        {discounts > 0 && (
                            <div className={styles.summaryRow}>
                                <span>Descuentos</span>
                                <span>−{currencyFormatter.format(discounts)}</span>
                            </div>
                        )}
                        <div className={styles.summaryRow}>
                            <span>Envío</span>
                            <span>{currencyFormatter.format(shipping)}</span>
                        </div>
                        <p className={styles.shippingMessage}>
                            Envío gratis en Lima Metropolitana
                        </p>
                        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                            <strong>Total final</strong>
                            <strong>{currencyFormatter.format(total)}</strong>
                        </div>
                        <p className={styles.summaryNote}>
                            El costo para destinos fuera de Lima Metropolitana no se calcula en esta etapa.
                        </p>
                    </div>
                </div>
            )}
        </section>
    )
}
