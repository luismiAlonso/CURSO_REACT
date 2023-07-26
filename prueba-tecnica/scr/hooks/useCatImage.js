import { getImageUrl } from '../servicios/facts.js'
import { useEffect, useState } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export const useCatImage = ({ fact }) => {
  const [imgUrl, setImgUrl] = useState()
  //segundo efecto recuperamos la imagen a partir del primero
  useEffect(() => {
    if (!fact) return
    getImageUrl(fact).then(setImgUrl)
  }, [fact])
  return { imgUrl: `${CAT_PREFIX_IMAGE_URL}${imgUrl}` }
} // { imgUrl: 'https:// ...'}
