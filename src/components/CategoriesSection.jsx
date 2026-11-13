import pc1 from '../assets/pc1.png'
import pc2 from '../assets/pc2.png'
import styles from './CategoriesSection.module.css'
import typography from './Typography.module.css'

const categories = [
    {
        id: 'pc-escritorio',
        name: 'PC de escritorio',
        image: pc1,
        alt: 'PC de escritorio',
    },
    {
        id: 'pc-gamer',
        name: 'PC gamer',
        image: pc2,
        alt: 'PC gamer',
    },
    {
        id: 'pc-1',
        name: 'PC gamer',
        image: pc1,
        alt: 'PC gamer',
    },
    {
        id: 'pc-2',
        name: 'PC gamer',
        image: pc1,
        alt: 'PC gamer',
    },
]

export function CategoriesSection (){
    return (
        <section className={styles.section}>
            <header>
                <span className={typography.label}>Explora</span>
                <h2 className={typography.title}>Compra por categoría</h2>
            </header>
            <ul className={styles.categoryCard}>
                {categories.map((category) =>(
                    <button key={category.id}>
                        <div className={styles.visual}>
                            <img src={category.image} alt={category.alt}/>
                        </div>
                        <span>{category.name}</span>
                    </button>
                ))}
            </ul>
        </section>
    )
}