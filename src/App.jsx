import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar.jsx'
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx'
import Cart from './components/Cart/Cart.jsx'
import CheckoutForm from './components/CheckoutForm/CheckoutForm.jsx'

function App() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Todo para disfrutar tu mate" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="*" element={<section className="status-card"><h1>Página no encontrada</h1></section>} />
        </Routes>
      </main>
    </>
  )
}

export default App
