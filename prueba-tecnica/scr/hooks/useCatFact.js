import { useEffect, useState } from 'react'
import { getRandomFacts } from '../servicios/facts'

export const useCatFact = () => {
  const [fact, setFact] = useState()
  const refreshRandomFats = () => {
    getRandomFacts().then(newFact => setFact(newFact))
  }
  //primer efecto recupera la palabra
  useEffect(refreshRandomFats, [])

  return { fact, refreshRandomFats }
}
