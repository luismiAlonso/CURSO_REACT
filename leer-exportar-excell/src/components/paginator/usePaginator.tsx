import { useState, useEffect } from 'react'

const usePaginator = (data: string[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [changePage, setChangePage] = useState(false)
  const [currentDataPage, setCurrentDataPage] = useState(data)
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data.length / itemsPerPage)
  )
  const [amountData, setAmountData] = useState(data)

  // const totalPages: number = Math.ceil(currentDataPage.length / itemsPerPage)

  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return currentDataPage.slice(startIndex, endIndex)
  }

  const getNextPage = () => {
    if (currentPage + 1 <= data.length) {
      let newCurrentPage = currentPage
      newCurrentPage++
      setCurrentPage(newCurrentPage)
      const startIndex = (newCurrentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return currentDataPage.slice(startIndex, endIndex)
    } else {
      currentDataPage
    }
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

  const resetPaginator = (newData: string[]) => {
    setChangePage(false)
    setCurrentPage(1)
    setTotalPages(Math.ceil(newData.length / itemsPerPage))
    setCurrentDataPage(newData)
  }

  const lazyLoad = () => {
    const dataSlize = getPageData()
    setAmountData([...amountData, ...dataSlize])
    //console.log(amountData)
    return amountData
  }

  useEffect(() => {
    setCurrentDataPage(data)
    setAmountData(data)
    setTotalPages(Math.ceil(currentDataPage.length / itemsPerPage)) // Recalcular totalPages
  }, [data, currentDataPage.length])

  return {
    itemsPerPage,
    currentPage,
    totalPages,
    changePage,
    currentDataPage,
    getNextPage,
    lazyLoad,
    setCurrentPage,
    setCurrentDataPage,
    resetPaginator,
    getPageData,
    nextPage,
    prevPage
  }
}

export default usePaginator
