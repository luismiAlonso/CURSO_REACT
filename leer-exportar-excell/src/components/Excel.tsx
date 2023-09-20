import React from 'react'
import useReadExcel from './readExcel/useReadExcel'
import CustomSelect from './selectComponent/CustomSelect'
import useCustomSelect from './selectComponent/useCustomSelect'
import { OptionSelect } from './selectComponent/OptionsSelect'
//import { FiltradoHookOptions, FiltradoData } from './filters/Ifilters'
import Tabla from './Tabla/Tabla'
import useExportExcel from './exportExcel/useExportExcel'
import FontSizeButtons from './fontSizebuttons/FontSizeButtons'
import Paginator from './paginator/Paginator'
import usePaginator from './paginator/usePaginator'
import { useEffect, useState } from 'react'
import useFilterData from './filters/useFilterData'
/*import { mapearArrayJSON } from "../utils/utilsData"
import { WorksheetItem } from "../interfaces/Istate"*/

function Excel() {
  const optionsSheeds: OptionSelect[] = []
  const filterOptionProperties: OptionSelect[] = []
  const firstCustomSelectRef = React.createRef<HTMLSelectElement>()

  const { state, selectHoja, leerExcel } = useReadExcel()
  const [currentDataState, setDataState] = useState<string[]>()
  const { exportToExcel, exportStatus } = useExportExcel()

  const {
    sortedDataProperties,
    filterData
  } = useFilterData()
  
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

  useEffect(() => {

    if (state.status && state.filas.length > 0) {

      //mapeo de hojas a strings
      state.woorksheets.forEach((worksheet) => {
        // options[worksheet.name] = worksheet.name
        optionsSheeds.push({ key: worksheet.index, value: worksheet.name })
      })

      state.propiedades.forEach((propiedad, index) => {
        if (index > 0) {
          filterOptionProperties.push({
            key: index.toString(),
            value: propiedad
          })
        }
      })

      updateOptionsProperties(filterOptionProperties)
      updateOptions(optionsSheeds)
    }
  }, [state])

  useEffect(() => {
    if (sortedDataProperties !== undefined) {
      setDataState(sortedDataProperties)
    }
  }, [selectValueProperties])

  const enviarDataPage = (newDataPage: string[]) => {
    setDataState(newDataPage)
  }

  const handlerLeerExcel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    leerExcel(e)
  }

  const handleSeleccionHoja = (value: string) => {
    if (value != undefined) {
      // handleSelectChange(value)
    }
  }

  /*const handlePropertyChange = (value: string) => {
    if (value !== undefined && currentDataState !== undefined) {
      updateData(currentDataState)
      updateProperty(value)
    }
  }*/

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    if(e.target!==undefined && currentDataState!==undefined){
      handleSelectedProperties(e)
      filterData(currentDataState,e.target.value,"desc")
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
              <Paginator filas={state.filas} setDataPage={enviarDataPage} />
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
                  {currentDataState !== undefined &&
                    currentDataState.length > 0 && (
                      <Tabla
                        datos={currentDataState}
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
