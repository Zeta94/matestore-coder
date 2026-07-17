import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import ItemCount from '../ItemCount/ItemCount.jsx'
import './ItemDetail.css'

function ItemDetail({ product }) {
  const [added, setAdded] = useState(false)
  const { addItem, cart } = useCart()
  const cartQuantity = cart.find((item) => item.id === product.id)?.quantity ?? 0
  const availableStock = Math.max(product.stock - cartQuantity, 0)

  const handleAdd = (quantity) => {
    addItem(product, quantity)
    setAdded(true)
  }

  return (
    <article className="detail-card">
      <img src={product.image} alt={product.name} />
      <div className="detail-content">
        <span className="category-tag">{product.category}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="detail-price">${product.price.toLocaleString('es-AR')}</p>
        <p className="stock">Stock disponible: {availableStock}</p>
        {added ? <Link className="button" to="/cart">Ir al carrito</Link> : <ItemCount stock={availableStock} onAdd={handleAdd} />}
      </div>
    </article>
  )
}

export default ItemDetail
