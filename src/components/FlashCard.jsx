import typography from './Typography.module.css'
import styles from './FlashCard.module.css'

export function FlashCard({span, title, details, button, sectionStyle}){
    return (
        <div className={styles[sectionStyle]}>
            <span className={typography.simpleLabel}>{span}</span>
            <h2 className={styles.title}>{title}</h2>
            <p className={typography.simpleText}>{details}</p>
            <button className={styles.button}>{button}</button>
        </div>
    )
}