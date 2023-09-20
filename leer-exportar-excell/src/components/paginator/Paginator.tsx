import React, { useEffect } from 'react'
import usePaginator from './usePaginator'

function Paginator({
  filas,
  setDataPage
}: {
  filas: string[]
  setDataPage: (data: string[]) => void
}) {
  const {
    currentPage,
    totalPages,
    getPageData,
    setCurrentPage,
    nextPage,
    prevPage
  } = usePaginator(filas, 100)

  const handlerPrevPage = () => {
    prevPage()
    setDataPage(getPageData())
  }

  const hadlerNextPage = () => {
    nextPage()
    setDataPage(getPageData())
  }

  useEffect(() => {

    if (getPageData() !== undefined && getPageData().length > 0) {
      setDataPage(getPageData())
    } else {
      setCurrentPage(1)
      setDataPage(filas)
    }
  }, [filas, totalPages])

  return (
    <>
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handlerPrevPage}
          disabled={currentPage === 1}
          className={`px-2 py-2 rounded-md ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-500'
              : 'bg-blue-500 text-white'
          }`}
        >
          Anterior
        </button>
        <p className="text-gray-600">
          Página {currentPage} de {totalPages}
        </p>
        <button
          onClick={hadlerNextPage}
          disabled={currentPage === totalPages}
          className={`px-2 py-2 rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-300 text-gray-500'
              : 'bg-blue-500 text-white'
          }`}
        >
          Siguiente
        </button>
      </div>
    </>
  )
}

export default Paginator
