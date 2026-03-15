import type { Product, ProductDetail } from '../types/product'

const BASE_URL = 'https://itx-frontend-test.onrender.com'

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/api/product`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function getProductById(id: string): Promise<ProductDetail> {
  const res = await fetch(`${BASE_URL}/api/product/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`)
  return res.json()
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
