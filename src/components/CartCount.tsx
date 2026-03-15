import { useCart } from '../hooks/useCart'

export default function CartCount() {
  const { count } = useCart()

  return (
    <div className="relative">
      <svg
        className="size-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-violet-900">
          {count}
        </span>
      )}
    </div>
  )
}
