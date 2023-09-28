import React, { useState } from 'react'
import useGlobalStore from '../globaStore/GlobalStore'
import useReadExcel from './readExcel/useReadExcel'
import InputFileExcel from './readExcel/InputFileExcel'
import usePaginator from './paginator/usePaginator'
import SelectComponent from './selectComponent/SelectComponent'
import useCustomSelect from './selectComponent/useCustomSelect'
import useFilterData from './filters/useFilterData'
import useToggle from './toggle/useToggle'
import ToggleComponent from './toggle/ToggleComponent'
import ScrollComponent from './scrollComponent/ScrollComponent'
import CreateHeaders from './insertHeadsTables/CreateHeadersComponent'
import { OptionSelect } from './selectComponent/IoptionsSelect'
import Tabla from './Tabla/Tabla'
import useExportExcel from './exportExcel/useExportExcel'
import FontSizeButtons from './fontSizebuttons/FontSizeButtons'
import useFontSize from './fontSizebuttons/useFontSize'
import Paginator from './paginator/Paginator'
import { useEffect, useCallback, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import InputFillComponent from './inputFill/InputFillComponent'
import useDebouncedFunction from '../utilsHooks/useDebounced'

function Excel() {
  const optionsSheeds: OptionSelect[] = []
  const filterOptionProperties: OptionSelect[] = []
  //const [loadFilterComponent, setLoadFilterComponent] = useState(false)
  const { fontSize, reducirFuente, aumentarFuente } = useFontSize()
  const { dataGlobalStore, setCurrentDataStore } = useGlobalStore()
  const { state, selectHoja, leerExcel, resetState } = useReadExcel()
  const { exportToExcel, exportStatus } = useExportExcel()

  const { filterData, filterByWords, isFiltered } = useFilterData()

  const {
    itemsPerPage,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    changePage,
    currentDataPage,
    setCurrentDataPage,
    getPageData
  } = usePaginator(state.filas, 100)

  const { options, handleSelectChange, updateOptions } = useCustomSelect(
    optionsSheeds[0],
    optionsSheeds
  )
  const {
    options: optionsProperties,
    selectedValue: selectValueProperties,
    defaultOption: defaultOptionProperties,
    setSelectedValue: setSelectedValueProperties,
    handleSelectChange: handleSelectedProperties,
    updateOptions: updateOptionsProperties
  } = useCustomSelect(state.propiedades[0], filterOptionProperties)

  const { getText } = useToggle(false, { trueText: 'asc', falseText: 'desc' })

  const valueProperty = useMemo(() => {
    return selectValueProperties === undefined &&
      defaultOptionProperties !== undefined
      ? defaultOptionProperties
      : selectValueProperties
  }, [selectValueProperties, defaultOptionProperties])

  // Usamos useCallback para la función debounced para evitar su recreación en cada render
  const debounceSearch = useCallback(
    useDebouncedFunction((valueSearch) => {
      filterByWords(
        state.filas,
        valueSearch,
        valueProperty,
        getText() as 'desc' | 'asc'
      )
        .then((response) => {
          setCurrentDataPage(response as string[])
        })
        .catch((error) => {
          console.error('Error al filtrar palabras:', error)
        })
    }, 400),
    [filterByWords, state.filas, valueProperty, getText]
  )

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
    setCurrentDataStore([])

    leerExcel(e).then((result) => {
      if (result) {
        loadSelectOption()
      }
    })
  }

  const handleSeleccionHoja = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target != undefined) {
      handleSelectChange(e)
    }
  }

  const handlePropertyChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target !== undefined) {
        handleSelectedProperties(e)
        const response = filterData(
          state.filas,
          e.target.value,
          getText() as 'asc' | 'desc'
        )
        response
          .then((result) => {
            if (result) {
              setCurrentDataPage(result as string[])
              //setCurrentDataStore(newDataPage)
            }
          })
          .catch((error) => {
            console.error('Error al filtrar datos:', error)
          })
      }
    },
    [state.filas, getText, setCurrentDataPage]
  )

  const handleToggle = useCallback(
    (value: boolean, text: string) => {
      const response = filterData(
        state.filas,
        valueProperty,
        text as 'desc' | 'asc'
      )
      response.then((res) => {
        if (res) {
          setCurrentDataPage(res as string[])
          //setCurrentDataStore()
        }
      })
    },
    [filterData,state.filas, valueProperty,setCurrentDataPage]
  )

  const handleInputTextChange = useCallback(
    (valueInput: string) => {
      debounceSearch(valueInput)
    },
    [debounceSearch]
  )

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

  const handleAumentarFuente = (e: React.MouseEvent<HTMLButtonElement>) => {
    aumentarFuente(e)
  }

  const handleReducirFuente = (e: React.MouseEvent<HTMLButtonElement>) => {
    reducirFuente(e)
  }

  const loadMoreData = useCallback(() => {
    nextPage()
    const nextPageData = getPageData()
    const newDataGlobalStore = [...dataGlobalStore, ...nextPageData]
    setCurrentDataStore(newDataGlobalStore)
  }, [
    dataGlobalStore,
    nextPage,
    getPageData,
    setCurrentDataStore
  ])
 
  const filterOnLoadData = async () => {
    if (state.filas && defaultOptionProperties) {
      const sortOrder = getText() as 'asc' | 'desc'

      try {
        const result = await filterData(
          state.filas,
          defaultOptionProperties,
          sortOrder
        )
        if (result) {
          setCurrentDataPage(result as string[])
          return true
        }
      } catch (error) {
        console.error('Error al filtrar datos:', error)
        return false
      }
    } else {
      return false
    }
  }

  useEffect(() => {
    if (defaultOptionProperties !== undefined) {
      filterOnLoadData()
    }
  }, [defaultOptionProperties])

  useEffect(() => {
    setCurrentDataStore(getPageData())
  }, [state, changePage, isFiltered, currentDataPage])

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
          <FontSizeButtons
            aumentarFuente={handleAumentarFuente}
            reducirFuente={handleReducirFuente}
          />
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
          <InputFillComponent
            activeButton={false}
            activeSearchIcon={true}
            typeFill={'search'}
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
        {/*<CreateHeaders />*/}
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
                          fontStyleSize={fontSize.toString()}
                        />
                      )}
                  </InfiniteScroll>
                  <ScrollComponent />
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
