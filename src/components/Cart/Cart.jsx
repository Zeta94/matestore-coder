import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import CartItem from '../CartItem/CartItem.jsx'
import './Cart.css'

function Cart() {
  const { cart, clearCart, getTotalPrice } = useCart()
  if (cart.length === 0) return <section className="empty-cart"><h1>Tu carrito está vacío</h1><p>Elegí tus productos materos favoritos.</p><Link className="button" to="/">Ver productos</Link></section>

  return (
    <section className="cart-page">
      <div className="page-heading"><p className="eyebrow">Tu selección</p><h1>Carrito de compras</h1></div>
      <div className="cart-list">{cart.map((item) => <CartItem key={item.id} item={item} />)}</div>
      <div className="cart-summary">
        <button className="button button-light" type="button" onClick={clearCart}>Vaciar carrito</button>
        <div><span>Total</span><strong>${getTotalPrice().toLocaleString('es-AR')}</strong></div>
        <Link className="button" to="/checkout">Finalizar compra</Link>
      </div>
    </section>
  )
}

export default Cart
