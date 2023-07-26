import { useCatImage } from '../hooks/useCatImage'

export const Otro = () => {
  const { imgUrl } = useCatImage({ fact: 'Random Fact' })
  return (
    <>
      {imgUrl && <img src={imgUrl} />}
    </>
  )
}
