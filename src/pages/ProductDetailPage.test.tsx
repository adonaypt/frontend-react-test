import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CartCount from '../components/CartCount'
import { CartProvider } from '../context/CartContext'
import { addToCart } from '../services/api'
import type { ProductDetail } from '../types/product'
import ProductDetailPage from './ProductDetailPage'

const mockProduct: ProductDetail = {
  id: 'abc123',
  brand: 'Samsung',
  model: 'Galaxy S24',
  price: '899',
  imgUrl: 'https://example.com/s24.png',
  networkTechnology: 'GSM',
  networkSpeed: '5G',
  gprs: 'Yes',
  edge: 'Yes',
  announced: '2024',
  status: 'Available',
  dimentions: '147 x 70.6 x 7.6 mm',
  weight: '167 g',
  sim: 'Nano-SIM',
  displayType: 'AMOLED',
  displayResolution: '1080 x 2340',
  displaySize: '6.2 inches',
  os: 'Android 14',
  cpu: 'Snapdragon 8 Gen 3',
  chipset: 'Qualcomm',
  gpu: 'Adreno 750',
  externalMemory: 'No',
  internalMemory: ['128GB', '256GB'],
  ram: '8 GB',
  primaryCamera: ['50 MP', '12 MP', '10 MP'],
  secondaryCmera: '12 MP',
  speaker: 'Yes',
  audioJack: 'No',
  wlan: ['Wi-Fi 6E'],
  bluetooth: ['5.3'],
  gps: 'Yes',
  nfc: 'Yes',
  radio: 'No',
  usb: 'USB Type-C 3.2',
  sensors: ['Fingerprint', 'Accelerometer'],
  battery: '4000 mAh',
  colors: ['Black', 'White'],
  options: {
    colors: [
      { code: 1, name: 'Black' },
      { code: 2, name: 'White' }
    ],
    storages: [
      { code: 10, name: '128 GB' },
      { code: 20, name: '256 GB' }
    ]
  }
}

vi.mock('../services/api', () => ({
  getProductById: vi.fn(() => Promise.resolve(mockProduct)),
  addToCart: vi.fn(() => Promise.resolve({ count: 1 }))
}))

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/product/abc123']}>
      <CartProvider>
        <CartCount />
        <Routes>
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  )
}

describe('ProductDetailPage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('shows loading then renders product details', async () => {
    renderPage()

    expect(screen.getByText('Loading product...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Samsung Galaxy S24')).toBeInTheDocument()
      expect(screen.getByText('Snapdragon 8 Gen 3')).toBeInTheDocument()
      expect(screen.getByText('8 GB')).toBeInTheDocument()
    })
  })

  it('renders storage and color selects with options', async () => {
    renderPage()

    await waitFor(() => expect(screen.getByText('Samsung Galaxy S24')).toBeInTheDocument())

    expect(screen.getByDisplayValue('128 GB')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Black')).toBeInTheDocument()
  })

  it('adds product to cart and shows toast', async () => {
    renderPage()
    const user = userEvent.setup()

    await waitFor(() => expect(screen.getByText('Add to cart')).toBeInTheDocument())

    await user.click(screen.getByText('Add to cart'))

    await waitFor(() => {
      expect(screen.getByText('Added to cart!')).toBeInTheDocument()
    })

    expect(addToCart).toHaveBeenCalledWith('abc123', 1, 10)
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
