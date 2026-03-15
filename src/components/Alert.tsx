interface AlertProps {
  message: string
  type?: 'error' | 'warning'
}

export default function Alert({ message, type = 'error' }: AlertProps) {
  const colors =
    type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-amber-200 bg-amber-50 text-amber-700'

  return (
    <div className={`mx-auto mt-10 max-w-md rounded-lg border px-6 py-4 text-center text-sm ${colors}`}>{message}</div>
  )
}
