import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { CartProvider } from '../context/CartContext'
import type { Product, ProductDetail } from '../types/product'
import ProductDetailPage from './ProductDetailPage'
import ProductListPage from './ProductListPage'

const mockProducts: Product[] = [
  { id: '1', brand: 'Samsung', model: 'Galaxy S24', price: 899, imgUrl: 'https://example.com/s24.png' },
  { id: '2', brand: 'Apple', model: 'iPhone 15', price: 999, imgUrl: 'https://example.com/iphone.png' }
]

const mockProductDetail: ProductDetail = {
  id: '1',
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
  getProducts: vi.fn(() => Promise.resolve(mockProducts)),
  getProductById: vi.fn(() => Promise.resolve(mockProductDetail)),
  addToCart: vi.fn(() => Promise.resolve({ count: 1 }))
}))

describe('PLP → PDP navigation', () => {
  it('clicking a product navigates to its detail page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CartProvider>
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </CartProvider>
      </MemoryRouter>
    )

    const user = userEvent.setup()

    await waitFor(() => expect(screen.getByText('Galaxy S24')).toBeInTheDocument())

    await user.click(screen.getByText('Galaxy S24'))

    await waitFor(() => {
      expect(screen.getByText('Samsung Galaxy S24')).toBeInTheDocument()
      expect(screen.getByText('Snapdragon 8 Gen 3')).toBeInTheDocument()
      expect(screen.getByText('899 €')).toBeInTheDocument()
    })
  })
})
