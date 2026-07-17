import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addItem = (product, quantity) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id)
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item,
        )
      }
      return [...currentCart, { ...product, quantity: Math.min(quantity, product.stock) }]
    })
  }

  const removeItem = (productId) => setCart((current) => current.filter((item) => item.id !== productId))
  const clearCart = () => setCart([])
  const isInCart = (productId) => cart.some((item) => item.id === productId)
  const getTotalQuantity = () => cart.reduce((total, item) => total + item.quantity, 0)
  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, isInCart, getTotalQuantity, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider')
  return context
}
