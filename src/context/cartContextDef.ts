import { createContext } from 'react'

export interface CartContextType {
  count: number
  increment: () => void
}

export const CartContext = createContext<CartContextType | null>(null)
