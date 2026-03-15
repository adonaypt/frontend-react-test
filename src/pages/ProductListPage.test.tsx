import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { CartProvider } from '../context/CartContext'
import type { Product } from '../types/product'
import ProductListPage from './ProductListPage'

const mockProducts: Product[] = [
  {
    id: '1',
    brand: 'Samsung',
    model: 'Galaxy S24',
    price: 899,
    imgUrl: 'https://example.com/s24.png'
  },
  {
    id: '2',
    brand: 'Apple',
    model: 'iPhone 15',
    price: 999,
    imgUrl: 'https://example.com/iphone.png'
  },
  {
    id: '3',
    brand: 'Xiaomi',
    model: 'Redmi Note 12',
    price: 199,
    imgUrl: 'https://example.com/redmi.png'
  }
]

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('../services/api', () => ({
  getProducts: vi.fn(() => Promise.resolve(mockProducts))
}))

function renderPage() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <ProductListPage />
      </CartProvider>
    </MemoryRouter>
  )
}

describe('ProductListPage', () => {
  it('shows loading then renders products', async () => {
    renderPage()

    expect(screen.getByText('Loading products...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Samsung')).toBeInTheDocument()
      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.getByText('Xiaomi')).toBeInTheDocument()
    })
  })

  it('filters products by search input', async () => {
    renderPage()
    const user = userEvent.setup()

    await waitFor(() => expect(screen.getByText('Samsung')).toBeInTheDocument())

    const input = screen.getByPlaceholderText('Search by brand or model...')
    await user.type(input, 'apple')

    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.queryByText('Samsung')).not.toBeInTheDocument()
    expect(screen.queryByText('Xiaomi')).not.toBeInTheDocument()
  })

  it('navigates to product detail on click', async () => {
    renderPage()
    const user = userEvent.setup()

    await waitFor(() => expect(screen.getByText('Galaxy S24')).toBeInTheDocument())

    await user.click(screen.getByText('Galaxy S24'))

    expect(mockNavigate).toHaveBeenCalledWith('/product/1')
  })
})
