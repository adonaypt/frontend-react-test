import { createContext, useContext, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'cart_count'

function getStoredCount() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? Number(stored) : 0
}

interface CartContextType {
  count: number
  increment: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(getStoredCount())

  function increment() {
    setCount((prev) => {
      const next = prev + 1
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }

  return <CartContext.Provider value={{ count, increment }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
