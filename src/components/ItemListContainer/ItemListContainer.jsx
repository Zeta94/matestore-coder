import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase/config.js'
import ItemList from '../ItemList/ItemList.jsx'
import Loader from '../Loader/Loader.jsx'

function ItemListContainer({ greeting }) {
  const { categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    const productsRef = collection(db, 'products')
    const productsQuery = categoryId ? query(productsRef, where('category', '==', categoryId)) : productsRef

    getDocs(productsQuery)
      .then((snapshot) => setProducts(snapshot.docs.map((product) => ({ id: product.id, ...product.data() }))))
      .catch(() => setError('No pudimos cargar los productos. Revisá la configuración de Firebase.'))
      .finally(() => setLoading(false))
  }, [categoryId])

  if (loading) return <Loader />

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Catálogo</p>
        <h1>{categoryId ? `Productos: ${categoryId}` : greeting}</h1>
      </div>
      {error && <p className="message error">{error}</p>}
      {!error && products.length === 0 && <p className="message">No hay productos disponibles.</p>}
      {!error && products.length > 0 && <ItemList products={products} />}
    </section>
  )
}

export default ItemListContainer
