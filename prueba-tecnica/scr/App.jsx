import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACTS = 'https://catfact.ninja/fact'
//const CAT_ENDPOINT_IMG_URL = `https://cataas.com/cat/says/${firstWord}`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imgUrl, setImgUrl] = useState()

  //primer efecto recupera la palabra
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACTS)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  //segundo efecto recuperamos la imagen a partir del primero
  useEffect(() => {
    if (!fact) return
    const firstWord = fact.split(' ', 3).join(' ')

    fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImgUrl(url)
      })
  }, [fact])

  return (
    <main>
        <h1>APP de gatitos</h1>
        <section>
          {fact && <p>{fact}</p>}
          {imgUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imgUrl}` }
          alt={`Image extracted using the first three word for ${fact}`} />}
        </section>
    </main>
  )
}
