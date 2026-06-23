import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'shooze_wishlist'

function loadWishlistFromStorage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed.items)) {
        return parsed.items
      }
    }
  } catch (error) {
    console.warn('Could not load wishlist from localStorage', error)
  }
  return []
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => loadWishlistFromStorage())

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }))
    } catch (error) {
      console.warn('Could not save wishlist to localStorage', error)
    }
  }, [items])

  const addItem = (product) => {
    if (!product) return
    setItems((current) => {
      if (current.some((item) => item.id === product.id)) return current
      return [...current, { id: product.id, name: product.name, price: product.price, image: product.image, url: product.url }]
    })
  }

  const removeItem = (productId) => {
    setItems((current) => current.filter((item) => item.id !== productId))
  }

  const toggleItem = (product) => {
    if (!product) return
    setItems((current) => {
      if (current.some((item) => item.id === product.id)) {
        return current.filter((item) => item.id !== product.id)
      }
      return [...current, { id: product.id, name: product.name, price: product.price, image: product.image, url: product.url }]
    })
  }

  const hasItem = (productId) => items.some((item) => item.id === productId)
  const totalCount = items.length

  const value = useMemo(() => ({
    items,
    totalCount,
    addItem,
    removeItem,
    toggleItem,
    hasItem,
  }), [items, totalCount])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
