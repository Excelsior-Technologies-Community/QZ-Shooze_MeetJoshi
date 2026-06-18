import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'shooze_cart'

function loadCartFromStorage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed.items)) {
        return parsed.items
      }
    }
  } catch (error) {
    console.warn('Could not load cart from localStorage', error)
  }
  return []
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCartFromStorage())
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }))
    } catch (error) {
      console.warn('Could not save cart to localStorage', error)
    }
  }, [items])

  const addItem = (product, quantity = 1) => {
    if (!product || quantity <= 0) return

    setItems((current) => {
      const existingIndex = current.findIndex((item) => item.id === product.id)
      if (existingIndex >= 0) {
        return current.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          url: product.url,
          in_stock: product.in_stock,
          quantity,
        },
      ]
    })
  }

  const updateQuantity = (productId, quantity) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (productId) => {
    setItems((current) => current.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setItems([])
  }

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const toggleCart = () => setIsCartOpen((open) => !open)
  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const value = useMemo(
    () => ({
      items,
      totalCount,
      totalPrice,
      isCartOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      toggleCart,
      openCart,
      closeCart,
    }),
    [items, totalCount, totalPrice, isCartOpen],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
