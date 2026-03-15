import { describe, expect, it } from 'vitest'
import type { Product } from '../types/product'
import { filterProducts } from './filterProducts'

const products: Product[] = [
  { id: '1', brand: 'Samsung', model: 'Galaxy S24', price: 899, imgUrl: '' },
  { id: '2', brand: 'Apple', model: 'iPhone 15', price: 999, imgUrl: '' },
  { id: '3', brand: 'Xiaomi', model: 'Redmi Note 12', price: 199, imgUrl: '' }
]

describe('filterProducts', () => {
  it('returns all products when search is empty', () => {
    expect(filterProducts(products, '')).toHaveLength(3)
  })

  it('filters by brand (case insensitive)', () => {
    const result = filterProducts(products, 'samsung')
    expect(result).toHaveLength(1)
    expect(result[0].brand).toBe('Samsung')
  })

  it('filters by model', () => {
    const result = filterProducts(products, 'iphone')
    expect(result).toHaveLength(1)
    expect(result[0].model).toBe('iPhone 15')
  })

  it('returns empty array when nothing matches', () => {
    expect(filterProducts(products, 'not found brand or model')).toHaveLength(0)
  })
})
