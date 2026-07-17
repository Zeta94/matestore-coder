import { useCart } from '../../context/CartContext.jsx'
import './CartItem.css'

function CartItem({ item }) {
  const { removeItem } = useCart()
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} />
      <div><h2>{item.name}</h2><p>Cantidad: {item.quantity}</p></div>
      <div><small>Precio unitario</small><p>${item.price.toLocaleString('es-AR')}</p></div>
      <div><small>Subtotal</small><p className="subtotal">${(item.price * item.quantity).toLocaleString('es-AR')}</p></div>
      <button className="remove-button" type="button" onClick={() => removeItem(item.id)}>Eliminar</button>
    </article>
  )
}

export default CartItem
