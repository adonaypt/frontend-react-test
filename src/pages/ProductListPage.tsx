import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

export default function ProductListPage() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`item-${i}`}
            onClick={() => navigate(`/product/item-${i}`)}
            className="flex cursor-pointer flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-3 flex h-40 w-full items-center justify-center rounded bg-gray-100 text-sm text-gray-400">
              {`item-${i}`}
            </div>
            <p className="text-sm text-gray-500">Samsung</p>
            <p className="font-medium text-gray-900">Galaxy S24</p>
            <p className="mt-1 text-sm font-semibold text-violet-600">1200 €</p>
          </div>
        ))}
      </div>
    </section>
  )
}
