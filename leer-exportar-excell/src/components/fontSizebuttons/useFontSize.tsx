import { useState } from "react"

function useFontSize(initialSize = 16, step = 2) {
  const [fontSize, setFontSize] = useState<number>(initialSize)

  const aumentarFuente = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("Entro aumento " + fontSize)
    if (fontSize < 16)
    setFontSize((prevFontSize) => prevFontSize + step)
  }

  const reducirFuente = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("Entro reduccion " + fontSize)
    if (fontSize > 2) setFontSize((prevFontSize) => prevFontSize - step)
  }

  return {
    fontSize,
    aumentarFuente,
    reducirFuente
  }
}

export default useFontSize
