import React from 'react'
import useGlobalStore from '../globaStore/GlobalStore'
import useReadExcel from './readExcel/useReadExcel'
import InputFileExcel from './readExcel/InputFileExcel'
import usePaginator from './paginator/usePaginator'
import SelectComponent from './selectComponent/SelectComponent'
import useCustomSelect from './selectComponent/useCustomSelect'
import useFilterData from './filters/useFilterData'
import useToggle from './toggle/useToggle'
import ToggleComponent from './toggle/ToggleComponent'
import { OptionSelect } from './selectComponent/IoptionsSelect'
import Tabla from './Tabla/Tabla'
import useExportExcel from './exportExcel/useExportExcel'
import FontSizeButtons from './fontSizebuttons/FontSizeButtons'
import Paginator from './paginator/Paginator'
import { useEffect, useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import InputTextComponent from './inputText/inputTextComponent'
import useDebouncedFunction from '../utilsHooks/useDebounced'

function Excel() {
  const optionsSheeds: OptionSelect[] = []
  const filterOptionProperties: OptionSelect[] = []
  const { dataGlobalStore, setCurrentDataStore } = useGlobalStore()
  const { state, selectHoja, leerExcel, resetState } = useReadExcel()
  const { exportToExcel, exportStatus } = useExportExcel()

  const { filterData, filterByWords } = useFilterData()

  const {
    itemsPerPage,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    changePage,
    getPageData,
    setDataPage
  } = usePaginator(state.filas, 100)

  const { options, handleSelectChange, updateOptions } = useCustomSelect(
    '',
    optionsSheeds
  )
  const {
    options: optionsProperties,
    selectedValue: selectValueProperties,
    setSelectedValue: setSelectedValueProperties,
    handleSelectChange: handleSelectedProperties,
    updateOptions: updateOptionsProperties
  } = useCustomSelect('', filterOptionProperties)

  const { getText } = useToggle(false, { trueText: 'asc', falseText: 'desc' })

  const debounceSearch = useDebouncedFunction((valueSearch) => {
    let valueProperty = ''
    if (selectValueProperties === '') {
      console.log(state.filas, valueSearch, state.propiedades[0], getText())
      valueProperty = state.propiedades[0]
    } else {
      console.log(state.filas, valueSearch, selectValueProperties, getText())
      valueProperty = selectValueProperties
    }
    const response = filterByWords(
      state.filas,
      valueSearch,
      valueProperty,
      getText() as 'desc' | 'asc'
    )
    response.then((result) => {
      console.log(result)
    })
  }, 400)

  const loadSelectOption = async () => {
    try {
      // Mapeo de hojas a strings
      const optionsSheeds = state.woorksheets.map((worksheet) => ({
        key: worksheet.index,
        value: worksheet.name
      }))

      // Mapeo de propiedades
      const filterOptionProperties = state.propiedades
        .slice(0)
        .map((propiedad, index) => ({
          key: index.toString(),
          value: propiedad
        }))

      // Utiliza await para esperar a que las operaciones asincrónicas se completen
      await updateOptionsProperties(filterOptionProperties)
      await updateOptions(optionsSheeds)
      return true
    } catch (error) {
      console.error('Error en loadSelectOption:', error)
      return false
    }
  }

  const handlerLeerExcel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    resetState()

    leerExcel(e).then((result) => {
      if (result) {
        loadSelectOption()
        //loadMachine()
      }
    })
  }

  const handleSeleccionHoja = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target != undefined) {
      handleSelectChange(e)
    }
  }

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target !== undefined) {
      handleSelectedProperties(e)
      const response = filterData(
        state.filas,
        e.target.value,
        getText() as 'asc' | 'desc'
      )
      response.then((res) => {
        if (res) {
          //loadMachine()
          const newDataPage = setDataPage(res as string[])
          setCurrentDataStore(newDataPage)
        }
      })
    }
  }

  const handleToggle = (value: boolean, text: string) => {
    let valueProperty = ''
    if (selectValueProperties === '') {
      valueProperty = state.propiedades[0]
    } else {
      valueProperty = selectValueProperties
    }
    const response = filterData(
      state.filas,
      valueProperty,
      text as 'desc' | 'asc'
    )

    response.then((res) => {
      if (res) {
        //loadMachine()
        const newDataPage = setDataPage(res as string[])
        setCurrentDataStore(newDataPage)
      }
    })
  }

  const handleInputTextChange = (valueInput: string) => {
    //aqui iria mi debounce
    debounceSearch(valueInput)
  }

  const handleInputTextClick = (valueInput: string) => {
    console.log(valueInput)
  }

  const handlerExportExcel = () => {
    if (state.filas !== undefined) {
      exportToExcel(state.filas, 'test.xlsx')
    } else {
      console.log('El documentono se ha cargado')
    }
  }

  const loadMoreData = useCallback(() => {
    nextPage()
    const nextPageData = getPageData()
    setCurrentDataStore([...dataGlobalStore, ...nextPageData])
  }, [dataGlobalStore, nextPage, getPageData, setCurrentDataStore])

  useEffect(() => {
    setCurrentDataStore(getPageData())
  }, [state, changePage])

  return (
    <div className="container mx-auto p-4">
      <h1>Leer Excel</h1>
      <form onSubmit={handlerLeerExcel}>
        <div className="relative z-0 w-full mb-6 group">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Selecciona un archivo excel:
          </label>
          <InputFileExcel />
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
              {
                <Paginator
                  prevPage={prevPage}
                  nextPage={nextPage}
                  visible={false}
                  totalPages={totalPages}
                  currentPage={currentPage}
                />
              }
              <label>Filter Propiedades</label>
              <SelectComponent
                optionsSelect={optionsProperties}
                selectedValueRef={optionsProperties[0].value}
                onSeleccion={handlePropertyChange}
              />
            </>
          )}
          <InputTextComponent
            activeButton={false}
            onChange={handleInputTextChange}
            onClick={handleInputTextClick}
          />
          <ToggleComponent
            valueProp={true}
            onChange={(value) => handleToggle(value, value ? 'asc' : 'desc')}
            trueText={'asc'}
            falseText={'desc'}
          />
        </div>
      </form>
      <hr />
      {state.status && (
        <>
          <label>Hojas</label>
          <SelectComponent
            optionsSelect={options}
            selectedValueRef={
              selectHoja.current !== null
                ? selectHoja.current.value
                : options[0].value
            }
            onSeleccion={handleSeleccionHoja}
          />
          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  <InfiniteScroll
                    dataLength={currentPage * itemsPerPage} //This is important field to render the next data
                    next={loadMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                  >
                    {dataGlobalStore !== undefined &&
                      dataGlobalStore.length > 0 && (
                        <Tabla
                          datos={dataGlobalStore}
                          columnas={state.propiedades}
                        />
                      )}
                  </InfiniteScroll>
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
