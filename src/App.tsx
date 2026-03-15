import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { CartProvider } from './context/CartContext'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductListPage from './pages/ProductListPage'

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  )
}

export default App
