import { products as initialProducts } from './moks/products.json'
import { Products } from './components/Products.jsx'
import { Header } from './components/header.jsx'
import { Footer } from './components/Footer.jsx'
import { useState } from 'react'
import { useFilters } from './hooks/useFilters'
import { IS_DEVELOPMENT } from './config'

function App() {
 
  const [products] = useState(initialProducts)
  const {filters ,filterProducts, setFilters} = useFilters()
  const filteredPodructs = filterProducts(products)

  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredPodructs} />
      {IS_DEVELOPMENT && <Footer filters ={filters} />}
    </>
  )
}

export default App
