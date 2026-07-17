import { useState } from 'react'
import './ItemCount.css'

function ItemCount({ stock, onAdd }) {
  const [quantity, setQuantity] = useState(1)
  if (stock === 0) return <button className="button" disabled>Sin stock</button>

  return (
    <div className="item-count">
      <div className="counter" aria-label="Selector de cantidad">
        <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity === 1}>−</button>
        <span>{quantity}</span>
        <button type="button" onClick={() => setQuantity((value) => Math.min(stock, value + 1))} disabled={quantity === stock}>+</button>
      </div>
      <button className="button" type="button" onClick={() => onAdd(quantity)}>Agregar al carrito</button>
    </div>
  )
}

export default ItemCount
