import { useState,useEffect } from 'react'

const usePaginator = (data: string[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [changePage, setChangePage] = useState(false)
  const [currentDataPage, setCurrentDataPage] = useState(data)
  const totalPages: number = Math.ceil(currentDataPage.length / itemsPerPage)

  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return currentDataPage.slice(startIndex, endIndex)
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      setChangePage(true)
    }
  }

  const prevPage = () => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage - 1)
      setChangePage(false)
    }
  }

  /*const setDataPage = (data: string[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    console.log(data)
    return data.slice(startIndex, endIndex)
  }*/
  useEffect(() => {
    setCurrentDataPage(data); // Actualiza currentDataPage cuando data cambia
  }, [data]);

  return {
    itemsPerPage,
    currentPage,
    totalPages,
    changePage,
    currentDataPage,
    setCurrentPage,
    setCurrentDataPage,
    getPageData,
    nextPage,
    prevPage
  }
}

export default usePaginator
