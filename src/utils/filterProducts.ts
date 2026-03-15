import type { Product } from '../types/product'

export function filterProducts(products: Product[], search: string): Product[] {
  const term = search.toLowerCase()
  return products.filter((p) => p.brand.toLowerCase().includes(term) || p.model.toLowerCase().includes(term))
}
