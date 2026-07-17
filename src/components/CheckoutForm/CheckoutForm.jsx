import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { db } from '../../firebase/config.js'
import './CheckoutForm.css'

const initialForm = { name: '', phone: '', email: '', emailRepeat: '' }

function CheckoutForm() {
  const { cart, clearCart, getTotalPrice } = useCart()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [orderId, setOrderId] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }))

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Ingresá tu nombre.'
    if (!form.phone.trim()) nextErrors.phone = 'Ingresá tu teléfono.'
    if (!form.email.trim()) nextErrors.email = 'Ingresá tu email.'
    if (!form.emailRepeat.trim()) nextErrors.emailRepeat = 'Repetí tu email.'
    if (form.email && form.emailRepeat && form.email !== form.emailRepeat) nextErrors.emailRepeat = 'Los emails no coinciden.'
    if (cart.length === 0) nextErrors.cart = 'El carrito está vacío.'
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    setSubmitError('')
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    try {
      const order = {
        buyer: { name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() },
        items: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
        total: getTotalPrice(),
        date: serverTimestamp(),
      }
      const orderReference = await addDoc(collection(db, 'orders'), order)
      setOrderId(orderReference.id)
      clearCart()
    } catch {
      setSubmitError('No pudimos registrar la compra. Revisá tu conexión y la configuración de Firebase.')
    } finally {
      setSubmitting(false)
    }
  }

  if (orderId) return (
    <section className="success-card">
      <span aria-hidden="true">✓</span><h1>¡Compra realizada!</h1>
      <p>Guardá tu número de orden:</p><strong>{orderId}</strong>
      <Link className="button" to="/">Volver al inicio</Link>
    </section>
  )

  return (
    <section className="checkout-page">
      <div className="page-heading"><p className="eyebrow">Último paso</p><h1>Datos de compra</h1></div>
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <label>Nombre<input name="name" value={form.name} onChange={handleChange} autoComplete="name" />{errors.name && <small>{errors.name}</small>}</label>
        <label>Teléfono<input name="phone" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel" />{errors.phone && <small>{errors.phone}</small>}</label>
        <label>Email<input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" />{errors.email && <small>{errors.email}</small>}</label>
        <label>Repetir email<input name="emailRepeat" type="email" value={form.emailRepeat} onChange={handleChange} />{errors.emailRepeat && <small>{errors.emailRepeat}</small>}</label>
        <div className="checkout-total"><span>Total a pagar</span><strong>${getTotalPrice().toLocaleString('es-AR')}</strong></div>
        {errors.cart && <p className="form-error">{errors.cart} <Link to="/">Ver productos</Link></p>}
        {submitError && <p className="form-error">{submitError}</p>}
        <button className="button" type="submit" disabled={submitting || cart.length === 0}>{submitting ? 'Generando orden...' : 'Confirmar compra'}</button>
      </form>
    </section>
  )
}

export default CheckoutForm
