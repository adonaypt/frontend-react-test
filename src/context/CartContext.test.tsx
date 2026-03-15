import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { STORAGE_KEY } from '../utils/constants'
import { useCart } from '../hooks/useCart'
import { CartProvider } from './CartContext'

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

describe('CartContext', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('starts at 0 when localStorage is empty', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.count).toBe(0)
  })

  it('reads initial count from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, '5')
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.count).toBe(5)
  })

  it('increments count and saves to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => result.current.increment())

    expect(result.current.count).toBe(1)
    expect(localStorage.getItem(STORAGE_KEY)).toBe('1')
  })

  it('throws when used outside provider', () => {
    expect(() => renderHook(() => useCart())).toThrow('useCart must be used within CartProvider')
  })
})
