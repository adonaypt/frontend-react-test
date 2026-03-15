import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import SearchBar from '../components/SearchBar'
import { getProducts } from '../services/api'
import type { Product } from '../types/product'
import { filterProducts } from '../utils/filterProducts'

export default function ProductListPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filtered = filterProducts(products, search)

  if (loading) return <Loading message="Loading products..." />

  if (error) return <Alert message="Something went wrong loading products. Try again later." />

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
