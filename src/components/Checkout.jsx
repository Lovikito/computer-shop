import { useState } from 'react'
import styles from './Checkout.module.css'

const currencyFormatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
})

const fields = [
    { name: 'name', label: 'Nombre', type: 'text', autoComplete: 'name' },
    { name: 'email', label: 'Correo', type: 'email', autoComplete: 'email' },
    { name: 'phone', label: 'Teléfono', type: 'tel', autoComplete: 'tel', inputMode: 'numeric' },
    { name: 'address', label: 'Dirección', type: 'text', autoComplete: 'street-address' },
    { name: 'district', label: 'Distrito', type: 'text', autoComplete: 'address-level2' },
    { name: 'reference', label: 'Referencia', type: 'text', autoComplete: 'address-line2' },
]

const emptyCustomer = {
    name: '',
    email: '',
    phone: '',
    address: '',
    district: '',
    reference: '',
}

function normalizeDistrict(district) {
    return district
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
}

const limaMetropolitanaDistricts = new Set([
    'ancón',
    'ate',
    'barranco',
    'breña',
    'carabayllo',
    'chaclacayo',
    'chorrillos',
    'cieneguilla',
    'comas',
    'el agustino',
    'independencia',
    'jesús maría',
    'la molina',
    'la victoria',
    'lima',
    'lima metropolitana',
    'lince',
    'los olivos',
    'lurigancho',
    'lurigancho chosica',
    'lurigancho-chosica',
    'lurín',
    'magdalena del mar',
    'miraflores',
    'pachacámac',
    'pucusana',
    'pueblo libre',
    'puente piedra',
    'punta hermosa',
    'punta negra',
    'rímac',
    'san bartolo',
    'san borja',
    'san isidro',
    'san juan de lurigancho',
    'san juan de miraflores',
    'san luis',
    'san martín de porres',
    'san miguel',
    'santa anita',
    'santa maría del mar',
    'santa rosa',
    'santiago de surco',
    'surquillo',
    'villa el salvador',
    'villa maría del triunfo',
    'cercado de lima',
].map(normalizeDistrict))

function calculateOrderSummary(items, district) {
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
    const shipping = limaMetropolitanaDistricts.has(normalizeDistrict(district)) ? 0 : 15

    return {
        items: items.map((item) => ({ ...item })),
        subtotal,
        discounts,
        shipping,
        total: subtotal - discounts + shipping,
    }
}

function validateCustomer(customer) {
    const errors = {}

    for (const field of fields) {
        if (!customer[field.name].trim()) {
            errors[field.name] = 'Este campo es obligatorio.'
        }
    }

    if (customer.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
        errors.email = 'Ingresa un correo válido.'
    }

    if (customer.phone.trim() && !/^\d+$/.test(customer.phone.trim())) {
        errors.phone = 'El teléfono debe contener solo números.'
    }

    return errors
}

export function Checkout({ items, onOrderComplete }) {
    const [customer, setCustomer] = useState(emptyCustomer)
    const [errors, setErrors] = useState({})
    const [completedOrder, setCompletedOrder] = useState(null)

    if (items.length === 0 && !completedOrder) {
        return null
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setCustomer((currentCustomer) => ({ ...currentCustomer, [name]: value }))
        setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const validationErrors = validateCustomer(customer)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) {
            return
        }

        const normalizedCustomer = Object.fromEntries(
            Object.entries(customer).map(([name, value]) => [name, value.trim()])
        )

        setCompletedOrder({
            customer: normalizedCustomer,
            summary: calculateOrderSummary(items, normalizedCustomer.district),
        })
        onOrderComplete()
    }

    if (completedOrder) {
        const { customer: orderCustomer, summary } = completedOrder

        return (
            <section className={styles.checkout} aria-labelledby="checkout-title">
                <h2 id="checkout-title" className={styles.title}>Resumen final del pedido</h2>
                <div className={styles.successMessage} role="status" aria-live="polite">
                    <strong>Compra realizada</strong>
                    <span>Gracias por tu compra, {orderCustomer.name}.</span>
                </div>

                <div className={styles.confirmationGrid}>
                    <div className={styles.details}>
                        <h3 className={styles.sectionTitle}>Datos de entrega</h3>
                        <p>{orderCustomer.name}</p>
                        <p>{orderCustomer.email}</p>
                        <p>{orderCustomer.phone}</p>
                        <p>{orderCustomer.address}, {orderCustomer.district}</p>
                        <p>Referencia: {orderCustomer.reference}</p>
                    </div>

                    <div className={styles.details}>
                        <h3 className={styles.sectionTitle}>Productos</h3>
                        <ul className={styles.orderItems}>
                            {summary.items.map((item) => (
                                <li className={styles.orderItem} key={item.id}>
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>{currencyFormatter.format(item.price * item.quantity)}</span>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.totals}>
                            <div className={styles.totalRow}>
                                <span>Subtotal</span>
                                <span>{currencyFormatter.format(summary.subtotal)}</span>
                            </div>
                            {summary.discounts > 0 && (
                                <div className={styles.totalRow}>
                                    <span>Descuentos</span>
                                    <span>−{currencyFormatter.format(summary.discounts)}</span>
                                </div>
                            )}
                            <div className={styles.totalRow}>
                                <span>Envío</span>
                                <span>{currencyFormatter.format(summary.shipping)}</span>
                            </div>
                            <p className={styles.shippingNote}>
                                {summary.shipping === 0
                                    ? 'Envío gratis en Lima Metropolitana.'
                                    : `Envío de ${currencyFormatter.format(summary.shipping)} para otros distritos o provincias.`}
                            </p>
                            <div className={`${styles.totalRow} ${styles.finalTotal}`}>
                                <strong>Total final</strong>
                                <strong>{currencyFormatter.format(summary.total)}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className={styles.newPurchaseButton}
                    onClick={() => {
                        setCompletedOrder(null)
                        setCustomer(emptyCustomer)
                        setErrors({})
                    }}
                >
                    Iniciar otra compra
                </button>
            </section>
        )
    }

    return (
        <section className={styles.checkout} aria-labelledby="checkout-title">
            <h2 id="checkout-title" className={styles.title}>Finalizar compra</h2>
            <form className={styles.form} noValidate onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div
                        className={`${styles.field} ${field.name === 'address' || field.name === 'reference' ? styles.fieldFull : ''}`}
                        key={field.name}
                    >
                        <label htmlFor={field.name} className={styles.label}>{field.label}</label>
                        <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            autoComplete={field.autoComplete}
                            inputMode={field.inputMode}
                            value={customer[field.name]}
                            required
                            aria-invalid={Boolean(errors[field.name])}
                            aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        {errors[field.name] && (
                            <span className={styles.error} id={`${field.name}-error`} role="alert">
                                {errors[field.name]}
                            </span>
                        )}
                    </div>
                ))}
                <button className={styles.submitButton} type="submit">
                    Confirmar compra
                </button>
            </form>
        </section>
    )
}
