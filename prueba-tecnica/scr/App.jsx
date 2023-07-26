import { useCatFact } from './hooks/useCatFact.js'
import { useCatImage } from './hooks/useCatImage.js'
import { Otro } from './components/Otro.jsx'
import './App.css'

//const CAT_ENDPOINT_IMG_URL = `https://cataas.com/cat/says/${firstWord}`

export function App () {
  const { fact, refreshRandomFats } = useCatFact()
  const { imgUrl } = useCatImage({ fact }) //custom hook

  const handleClick = () => {
    refreshRandomFats()
  }

  return (
    <main>
        <h1>APP de gatitos</h1>
        <button onClick={handleClick}>Get New fact</button>
        <section>
          {fact && <p>{fact}</p>}
          {imgUrl && <img src={imgUrl} alt={`Image extracted using the first three word for ${fact}`} />}
        </section>
        <Otro />
    </main>
  )
}
