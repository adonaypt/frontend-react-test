import { useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const colors = type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-[slideUp_0.3s_ease-out]">
      <div className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${colors}`}>
        <span>{message}</span>
        <button onClick={onClose} className="cursor-pointer opacity-70 hover:opacity-100">
          ✕
        </button>
      </div>
    </div>
  )
}
