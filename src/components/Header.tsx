import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import CartCount from './CartCount'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-violet-700 shadow-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-white"
          >
            Mobile Shop
          </Link>
          <Breadcrumbs />
        </div>
        <CartCount />
      </div>
    </header>
  )
}
