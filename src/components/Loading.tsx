export default function Loading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-20 text-gray-400">
      <p className="text-lg">{message}</p>
    </div>
  )
}
