import React, { useState } from 'react'
import { State, WorksheetItem } from '../../interfaces/Istate'
import { isDate } from '../filters/utilFiters'
import * as XLSX from 'xlsx'
import { format } from 'date-fns-tz'

function useReadExcel() {
  const initialState: State = {
    nameDoc: '',
    woorksheets: [],
    hoja: [],
    filas: [],
    propiedades: [],
    status: false
  }
  const [state, setState] = useState(initialState)

  const selectHoja = React.createRef<HTMLSelectElement>()

  const resetState = () => {
    setState(initialState)
  }

  const leerFilas = (index: number) => {
    try {
      const hoja = state.woorksheets[index].data
      const filas: string[] = XLSX.utils.sheet_to_json(hoja, {
        dateNF: 'dd/mm/yy', // Especifica el formato de fecha esperado
        raw: false // Mantén las fechas como texto
      })

      const mappedFilas = filas.map((row) => {
        const entradas = Object.entries(row)

        for (const [key, value] of entradas) {
          if (isDate(value)) {
            const date = new Date(value)
            const formattedDate = format(date, 'dd/MM/yyyy') // Change the format as needed
            row[key] = formattedDate
          }
        }
        return row
      })

      state.filas = mappedFilas //filas
      setState({ ...state, filas: state.filas })
    } catch (error) {
      console.error('Error al leer filas', error)
    }
  }

  const leerPropiedades = (index: number) => {
    try {
      const hoja = state.woorksheets[index]
      const newProiedades = []
      for (const key in hoja.data) {
        const regEx = new RegExp('^(\\w)(1){1}$')
        if (regEx.test(key)) {
          newProiedades.push(hoja.data[key].w)
        }
      }
      state.propiedades = newProiedades
      setState({ ...state, propiedades: state.propiedades })
    } catch (error) {
      console.error('Error al leer propiedades', error)
    }
  }

  const cambiarHoja = () => {
    if (selectHoja.current !== null) {
      try {
        leerPropiedades(Number(selectHoja.current.value))
        leerFilas(Number(selectHoja.current.value))
        setState({
          ...state,
          filas: state.filas,
          propiedades: state.propiedades
        })
      } catch (error) {
        console.error('Error al cambiar de Hoja', error)
      }
    }
  }

  const leerExcel = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    const excel = formData.get('excel')

    if (excel instanceof Blob) {
      const reader = new FileReader()

      // Usamos una promesa para leer el archivo
      const readFile = (file: Blob) => {
        return new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsArrayBuffer(file)
        })
      }

      try {
        const fileData = await readFile(excel)

        const data = new Uint8Array(fileData as ArrayBuffer)
        const excelRead = XLSX.read(data, {
          type: 'array'
        })

        const listWorksheet: WorksheetItem[] = []

        excelRead.SheetNames.forEach(function (SheetNames, index) {
          if (Array.isArray(excelRead.SheetNames)) {
            listWorksheet.push({
              data: excelRead.Sheets[SheetNames],
              name: SheetNames,
              index: index
            })
          }
        })

        state.woorksheets = listWorksheet
        setState({ ...state, woorksheets: state.woorksheets })

        leerPropiedades(0)
        leerFilas(0)
        setState({
          ...state,
          filas: state.filas,
          propiedades: state.propiedades,
          status: true
        })
        return true
      } catch (error) {
        console.error('Error al procesar el archivo Excel', error)
        return false
      }
    } else {
      console.log('Blob error')
      return false
    }
  }

  return {
    state,
    resetState,
    selectHoja,
    cambiarHoja,
    setState,
    leerFilas,
    leerPropiedades,
    leerExcel
  }
}

export default useReadExcel
