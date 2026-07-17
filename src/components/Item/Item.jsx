import { Link } from 'react-router-dom'
import './Item.css'

function Item({ product }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-card-body">
        <span className="category-tag">{product.category}</span>
        <h2>{product.name}</h2>
        <p className="price">${product.price.toLocaleString('es-AR')}</p>
        <Link className="button button-secondary" to={`/item/${product.id}`}>Ver detalle</Link>
      </div>
    </article>
  )
}

export default Item
