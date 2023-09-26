import { useState } from 'react'

const usePaginator = (data: string[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [changePage,setChangePage] = useState(false)
  const totalPages: number = Math.ceil(data.length / itemsPerPage)

  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
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

  const setDataPage = (data: string[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  return {
    itemsPerPage,
    currentPage,
    totalPages,
    changePage,
    setCurrentPage,
    setDataPage,
    getPageData,
    nextPage,
    prevPage
  }
}

export default usePaginator
