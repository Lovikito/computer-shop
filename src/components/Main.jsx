import styles from './Main.module.css'

const featuredProduct = {
    id: 'linea-titan-rtx-4070-super',
    name: 'Linea Titan RTX 4070 SUPER',
    price: 6299,
    compareAtPrice: 8299,
}

export function Main({ onAddToCart }) {
    return(
        <>
        <main>
            <section>
                <div>
                    <span>Armado y testeo en 24h / Windows 11 pro Licenciado/ Soporte local en Wilson & Envios Peru</span>
                    <span>TASA REF. BANCO DE LA NACION TC S/. 3.78</span>
                </div>
                <div>
                    <span>OFERTA DE LA SEMANA</span>
                    <span>ENVIO GRATIS A LIMA METROPOLITANA</span>
                    <span>GARANTIA 2 AÑOS OFICIAL</span>
                </div>
                <div>
                    <div>
                        <h1>Linea Titan <span>RTX 4070 SUPER</span></h1>
                        <h2>Potencia con Intel core i7 14va Gen & 32GB DDR5 Kingston Fury Beast</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet reprehenderit incidunt architecto expedita dolore ullam distinctio id fugiat facere nisi unde nostrum quasi, sequi quae laudantium, perspiciatis optio odio ipsum!</p>
                        <div>
                            <div>
                                <h3>Precio promocional al contado</h3>
                                <p>S/. 6,299.00</p>
                                <p><s>S/. 8,299.00</s></p>
                                <span>o 12 cuotas sin intereses de S/. 524.90</span>
                            </div>
                            <button
                                type="button"
                                className={styles.addToCartButton}
                                onClick={() => onAddToCart(featuredProduct)}
                            >
                                Agregar al carrito
                            </button>
                            <button>Ver Configuraciones Gamer</button>
                            <button>Arma tu pc a medida</button>
                        </div>
                        <div>
                            <div>
                                <span>Lorem</span>
                                <span>Lorem</span>
                            </div>
                            <div>
                                <span>Lorem</span>
                                <span>Lorem</span>
                            </div>
                            <div>
                                <span>Lorem</span>
                                <span>Lorem</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="" alt="" />
                            <div>
                                <span>i7-14 5.6ghz</span>
                                <span>RTX 4070</span>
                                <span>2TB NVMe Gen 4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                {/* Todo: Carrusel + Logica */}
            </section>
        </main>
        </>
    )
}