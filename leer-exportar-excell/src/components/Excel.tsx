import React from 'react'
import useGlobalStore from '../globaStore/GlobalStore'
import useReadExcel from './readExcel/useReadExcel'
import usePaginator from './paginator/usePaginator'
import CustomSelect from './selectComponent/CustomSelect'
import useCustomSelect from './selectComponent/useCustomSelect'
import useFilterData from './filters/useFilterData'
import { OptionSelect } from './selectComponent/IoptionsSelect'
import Tabla from './Tabla/Tabla'
import useExportExcel from './exportExcel/useExportExcel'
import FontSizeButtons from './fontSizebuttons/FontSizeButtons'
import Paginator from './paginator/Paginator'
import { useEffect, useState } from 'react'
import useLazyLoad from './lazyLoad/useLazyLoad'

function Excel() {
  const optionsSheeds: OptionSelect[] = []
  const filterOptionProperties: OptionSelect[] = []
  const firstCustomSelectRef = React.createRef<HTMLSelectElement>()
  const { dataGlobalStore, setCurrentDataStore } = useGlobalStore()
  const { state, selectHoja, leerExcel } = useReadExcel()
  const { exportToExcel, exportStatus } = useExportExcel()
  const { dataLazyLoad, isReady, loadMoreData, setDataLazyLoad, handleScroll } =
    useLazyLoad()

  const { sortedDataProperties, filterData, resetFilter } = useFilterData()
  /* const { currentPage, totalPages, nextPage, prevPage, getPageData } =
    usePaginator(state.filas, 100)*/
  const { options, handleSelectChange, updateOptions } = useCustomSelect(
    '',
    optionsSheeds
  )
  const {
    options: optionsProperties,
    selectedValue: selectValueProperties,
    handleSelectChange: handleSelectedProperties,
    updateOptions: updateOptionsProperties
  } = useCustomSelect('', filterOptionProperties)

  const loadSelectOption = () => {
    // Mapeo de hojas a strings
    const optionsSheeds = state.woorksheets.map((worksheet) => ({
      key: worksheet.index,
      value: worksheet.name
    }))

    // Mapeo de propiedades
    const filterOptionProperties = state.propiedades
      .slice(1)
      .map((propiedad, index) => ({
        key: index.toString(),
        value: propiedad
      }))

    updateOptionsProperties(filterOptionProperties)
    updateOptions(optionsSheeds)
  }

  useEffect(() => {
    if (state.status && state.filas.length > 0) {
      loadSelectOption()
      // PAGINATOR
      // componente de carga lazy
      setDataLazyLoad(state.filas)
      handleScroll()

      if (
        sortedDataProperties !== undefined &&
        sortedDataProperties.length > 0
      ) {
        setCurrentDataStore(sortedDataProperties)
        resetFilter()
      }
    }
  }, [state, selectValueProperties]) // Negamos el resultado de isReady

  useEffect(() => {
    const ready=isReady()
    if(ready){
      setCurrentDataStore(dataLazyLoad)
      console.log("entro")
    }
  }, [isReady()])

  /*
  * enviar data page revisar para paginator
  const enviarDataPage = (newDataPage: string[]) => {
    setDataState(newDataPage)
  }*/

  const handlerLeerExcel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    leerExcel(e)
  }

  const handleSeleccionHoja = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target != undefined) {
      handleSelectChange(e)
    }
  }

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target !== undefined && dataGlobalStore !== undefined) {
      handleSelectedProperties(e)
      filterData(dataGlobalStore, e.target.value, 'desc')
    }
  }

  const handlerExportExcel = () => {
    if (state.filas !== undefined) {
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
          <FontSizeButtons />
          {state.filas.length > 0 && (
            <>
              {/*<Paginator
                prevPage={prevPage}
                nextPage={nextPage}
                totalPages={totalPages}
                currentPage={currentPage}
          />*/}
              <label>Filter Propiedades</label>
              <CustomSelect
                optionsSelect={optionsProperties}
                selectedValueRef={firstCustomSelectRef}
                onSeleccion={handlePropertyChange}
              />
            </>
          )}
        </div>
      </form>
      <hr />
      {state.status && (
        <>
          <label>Hojas</label>
          <CustomSelect
            optionsSelect={options}
            selectedValueRef={selectHoja}
            onSeleccion={handleSeleccionHoja}
          />
          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  {dataGlobalStore !== undefined &&
                    dataGlobalStore.length > 0 && (
                      <Tabla
                        datos={dataGlobalStore}
                        columnas={state.propiedades}
                      />
                    )}
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
