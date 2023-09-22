import { useState, useEffect } from 'react'

function useLazyLoad(itemsPerPage = 100) {
  const [dataLazyLoad, setDataLazyLoad] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setLoading] = useState(false)
  
  const loadMoreData = () => {
    const totalPages = Math.ceil(dataLazyLoad.length / itemsPerPage)

    if (isLoading || currentPage >= totalPages) return

    setLoading(true)

    try {
      const startIndex = currentPage * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const newDataBlock = dataLazyLoad.slice(startIndex, endIndex)
      setDataLazyLoad((prevData) => [...prevData, ...newDataBlock])
      setCurrentPage(currentPage + 1)
    } catch (error) {
      console.error('Error al cargar más datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleScroll = () => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const bodyHeight = document.body.scrollHeight
    if (scrollY + windowHeight >= bodyHeight - 100 && !isLoading) {
      loadMoreData()
    }
  }

  const isReady = () => dataLazyLoad !== undefined && dataLazyLoad.length > 0;


  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading])

  return { dataLazyLoad,isReady,setDataLazyLoad,loadMoreData, handleScroll }
}

export default useLazyLoad
