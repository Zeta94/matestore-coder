import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase/config.js'
import ItemDetail from '../ItemDetail/ItemDetail.jsx'
import Loader from '../Loader/Loader.jsx'

function ItemDetailContainer() {
  const { itemId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    getDoc(doc(db, 'products', itemId))
      .then((snapshot) => setProduct(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null))
      .catch(() => setError('No pudimos cargar el producto. Revisá la configuración de Firebase.'))
      .finally(() => setLoading(false))
  }, [itemId])

  if (loading) return <Loader />
  if (error) return <p className="message error">{error}</p>
  if (!product) return <p className="message">El producto no existe.</p>
  return <ItemDetail product={product} />
}

export default ItemDetailContainer
