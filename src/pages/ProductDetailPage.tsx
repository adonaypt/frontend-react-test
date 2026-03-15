import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Toast from '../components/Toast'
import { useCart } from '../context/CartContext'
import { addToCart, getProductById } from '../services/api'
import type { ProductDetail } from '../types/product'

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 text-right">{value}</span>
    </div>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const { increment } = useCart()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState<number | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null)
  const [adding, setAdding] = useState(false)
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return
      try {
        const data = await getProductById(id)
        setProduct(data)
        if (data.options.colors.length > 0) setSelectedColor(data.options.colors[0].code)
        if (data.options.storages.length > 0) setSelectedStorage(data.options.storages[0].code)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  async function handleAddToCart() {
    if (!product || selectedColor === null || selectedStorage === null) return
    setAdding(true)
    setFeedback(null)
    try {
      await addToCart(product.id, selectedColor, selectedStorage)
      increment()
      setFeedback({ type: 'success', message: 'Added to cart!' })
    } catch {
      setFeedback({ type: 'error', message: 'Failed to add to cart' })
    } finally {
      setAdding(false)
    }
  }

  if (loading) return <Loading message="Loading product..." />

  if (!product) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Link to="/" className="text-sm text-violet-600 hover:text-violet-800">
          Back to products
        </Link>
        <Alert message="Product not found" />
      </div>
    )
  }

  return (
    <section>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-violet-600 hover:text-violet-800 transition-colors"
      >
        &larr; Back to products
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-6">
          <img src={product.imgUrl} className="max-h-80 object-contain" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              {product.brand} {product.model}
            </h2>
            <div className="flex flex-col gap-3 text-sm">
              <DetailRow label="Price" value={product.price ? `${product.price} €` : 'N/A'} />
              <DetailRow label="CPU" value={product.cpu} />
              <DetailRow label="RAM" value={product.ram} />
              <DetailRow label="OS" value={product.os} />
              <DetailRow label="Display" value={product.displayResolution} />
              <DetailRow label="Battery" value={product.battery} />
              <DetailRow
                label="Primary camera"
                value={Array.isArray(product.primaryCamera) ? product.primaryCamera.join(', ') : product.primaryCamera}
              />
              <DetailRow label="Dimensions" value={product.dimentions} />
              <DetailRow label="Weight" value={product.weight} />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Actions</h2>
            <div className="flex flex-col gap-4">
              <select
                value={selectedStorage ?? ''}
                onChange={(e) => setSelectedStorage(Number(e.target.value))}
                className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                {product.options.storages.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedColor ?? ''}
                onChange={(e) => setSelectedColor(Number(e.target.value))}
                className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                {product.options.colors.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="cursor-pointer rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {adding ? 'Adding...' : 'Add to cart'}
              </button>
              {feedback && <Toast message={feedback.message} type={feedback.type} onClose={() => setFeedback(null)} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
