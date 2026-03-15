import { useState, type ReactNode } from 'react'
import { STORAGE_KEY } from '../utils/constants'
import { CartContext } from './cartContextDef'

function getStoredCount() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? Number(stored) : 0
}

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
