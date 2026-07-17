import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import './CartWidget.css'

function CartWidget() {
  const { getTotalQuantity } = useCart()
  const quantity = getTotalQuantity()
  return <Link className="cart-widget" to="/cart" aria-label={`Carrito con ${quantity} productos`}><span aria-hidden="true">🛒</span><span>{quantity}</span></Link>
}

export default CartWidget
