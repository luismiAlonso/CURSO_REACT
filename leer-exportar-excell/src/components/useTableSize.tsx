import { useState } from "react"

function useTablaSize() {
    
  const [tablaMod, setTablaGrande] = useState(false)

  const toggleTablaSize = () => {
    setTablaGrande(tablaMod)
  }
  return { tablaMod, toggleTablaSize }
}

export default useTablaSize
