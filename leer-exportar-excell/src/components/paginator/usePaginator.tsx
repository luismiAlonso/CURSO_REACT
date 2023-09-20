import { useState } from 'react'

const usePaginator = (data: string[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPage, setPage] = useState(data)
  const totalPages:number = Math.ceil(data.length / itemsPerPage)

  const setDataPage = (newDataPage: string[]) => {
    setPage(newDataPage)
  }

  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return {
    currentPage,
    totalPages,
    dataPage,
    setCurrentPage,
    getPageData,
    setDataPage,
    nextPage,
    prevPage
  }
}

export default usePaginator
