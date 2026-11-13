import { useState } from 'react'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { Main } from './components/Main.jsx'
import { Cart } from './components/Cart.jsx'
import { Checkout } from './components/Checkout.jsx'
import { useTheme } from './hooks/useTheme.js'

function App() {
  const {theme, toggleTheme} = useTheme()
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const updateCartQuantity = (productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    )
  }

  const clearCart = () => setCartItems([])

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme}/>
      <Main onAddToCart={addToCart}/>
      <Cart
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />
      <Checkout items={cartItems} onOrderComplete={clearCart}/>
      <Footer/>
    </>
  )
}

export default App
