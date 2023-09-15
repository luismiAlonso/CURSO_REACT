import useFontSize from './useFontSize'
import useReadExcel from '../components/readExcel/useReadExcel'
import useExportExcel from './exportExcel/useExportExcel'
import usePaginator from './paginator/usePaginator'
import { useEffect, useState } from 'react'
/*import { mapearArrayJSON } from "../utils/utilsData"
import { WorksheetItem } from "../interfaces/Istate"*/

function Excel() {
  const { fontSize, aumentarFuente, reducirFuente } = useFontSize()

  const { state, resetState, selectHoja, cambiarHoja, leerExcel } =
    useReadExcel()

  const { currentPage, totalPages, getPageData, nextPage, prevPage } =
    usePaginator(state.filas, 100)

  const [currentState, setCurrentState] = useState<string[] | undefined>()

  const { exportToExcel, exportStatus } = useExportExcel()

  useEffect(() => {
    if (state.status && state.filas.length > 0) {
      setCurrentState(state.propiedades)
    }
  }, [state])
  // Coloca aquí la lógica que deseas ejecutar después de la actualización del estado
  const handlerLeerExcel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    leerExcel(e)
  }

  const handlerExportExcel = () => {
    //e.preventDefault()
    if (currentState !== undefined) {
      exportToExcel(state.filas, 'test.xlsx')
    } else {
      console.log('El documentono se ha cargado')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1>Leer Excel</h1>
      <form onSubmit={handlerLeerExcel}>
        <div className="relative z-0 w-full mb-6 group">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Selecciona un archivo excel:
          </label>
          <input
            type={'file'}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            accept=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            name="excel"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Convertir
          </button>
          <button
            onClick={handlerExportExcel}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Exportar
          </button>
          <button onClick={aumentarFuente} type="button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 11V8H13V11H16V13H13V16H11V13H8V11H11Z"
                fill="#ffffff"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 12C3 16.9706 7.02944 21 12 21H18C19.6569 21 21 19.6569 21 18V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5Z"
                fill="#ffffff"
              />
            </svg>
          </button>
          <button onClick={reducirFuente} type="button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 11 11 H 16 V 13 H 8 V 11 Z" fill="#ffffff" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 12C3 16.9706 7.02944 21 12 21H18C19.6569 21 21 19.6569 21 18V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5Z"
                fill="#ffffff"
              />
            </svg>
          </button>
          {state.filas.length > 0 && (
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={prevPage}
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
                onClick={nextPage}
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
          )}
        </div>
      </form>
      <hr />
      {state.status && (
        <>
          <form>
            <label>Hojas</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ref={selectHoja}
              onChange={cambiarHoja}
            >
              {state.woorksheets.map((hoja, index) => {
                return (
                  <option key={index} value={index}>
                    {hoja.name}
                  </option>
                )
              })}
            </select>
          </form>
          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  <table
                    className={`table-large min-w-full font-light`}
                    style={{ fontSize: fontSize }}
                  >
                    <thead className="border-b dark:border-neutral-500">
                      <tr>
                        {state.propiedades.map((propiedad, index) => {
                          //  console.log("propiedades:", propiedad)
                          return (
                            <th className="px-6 py-4" key={index}>
                              {propiedad}
                            </th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {getPageData().map((fila, index1) => {
                        return (
                          <tr
                            className="border-b dark:border-neutral-500"
                            key={index1}
                          >
                            {state.propiedades.map((propiedad, index2) => {
                              return (
                                <td
                                  className="whitespace-nowrap px-6 py-4 font-medium"
                                  key={index2}
                                >
                                  {fila[propiedad]}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Excel
