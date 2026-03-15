import type { Product, ProductDetail } from '../types/product'
import { BASE_URL, CACHE_KEY_PRODUCT_DETAIL, CACHE_KEY_PRODUCTS } from '../utils/constants'
import { getFromCache, saveToCache } from './cache'

export async function getProducts(): Promise<Product[]> {
  const cached = getFromCache<Product[]>(CACHE_KEY_PRODUCTS)
  if (cached) return cached

  const res = await fetch(`${BASE_URL}/api/product`)
  if (!res.ok) throw new Error('Failed to fetch products')

  const data = await res.json()
  saveToCache(CACHE_KEY_PRODUCTS, data)

  return data
}

export async function getProductById(id: string): Promise<ProductDetail> {
  const cacheKey = `${CACHE_KEY_PRODUCT_DETAIL}_${id}`
  const cached = getFromCache<ProductDetail>(cacheKey)
  if (cached) return cached

  const res = await fetch(`${BASE_URL}/api/product/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`)

  const data = await res.json()
  saveToCache(cacheKey, data)

  return data
}

export async function addToCart(id: string, colorCode: number, storageCode: number): Promise<{ count: number }> {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, colorCode, storageCode })
  })
  if (!res.ok) throw new Error('Failed to add to cart')
  return res.json()
}
