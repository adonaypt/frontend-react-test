import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { getProducts } from '../services/api'
import type { Product } from '../types/product'

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filtered = products.filter((p) => {
    const term = search.toLowerCase()
    return p.brand.toLowerCase().includes(term) || p.model.toLowerCase().includes(term)
  })

  if (loading) return <p className="text-gray-500">Loading...</p>

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex cursor-pointer flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <img src={product.imgUrl} className="mb-3 h-40 w-full rounded object-contain" />
            <p className="text-sm text-gray-500">{product.brand}</p>
            <p className="font-medium text-gray-900">{product.model}</p>
            <p className="mt-1 text-sm font-semibold text-violet-600">{product.price ? `${product.price} €` : 'N/A'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
