import { Link, useLocation } from 'react-router-dom'

export default function Breadcrumbs() {
  const location = useLocation()
  const isDetailPage = location.pathname.startsWith('/product/')

  return (
    <nav>
      <ol className="flex items-center gap-1 text-sm text-violet-200">
        <li>
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
        </li>
        {isDetailPage && (
          <li className="flex items-center gap-1 text-white font-medium">
            <span>/</span>
            <span>Product Details</span>
          </li>
        )}
      </ol>
    </nav>
  )
}
