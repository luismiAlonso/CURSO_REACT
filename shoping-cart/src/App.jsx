import { products as initialProducts } from './moks/products.json'
import { Products } from './components/Products.jsx'
import { Header } from './components/header.jsx'
import { Footer } from './components/Footer.jsx'
import { useFilters } from './hooks/useFilters'
import { IS_DEVELOPMENT } from './config'
import { Cart } from './components/Cart'
import { CartProvider } from './context/cart'

function App() {
 
  const {filterProducts} = useFilters()
  const filteredPodructs = filterProducts(initialProducts)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredPodructs} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  )
}

export default App
