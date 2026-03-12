import { useParams } from 'react-router-dom'

export default function ProductDetailPage() {
  const { id } = useParams()
  console.log(id)

  return <>item {id}</>
}
