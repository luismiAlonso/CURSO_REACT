import React, { useState } from 'react'
import { State, WorksheetItem } from '../../interfaces/Istate'
import * as XLSX from 'xlsx'

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
        dateNF: 'd/m/yyyy', // Especifica el formato de fecha esperado
        raw: false // Mantén las fechas como texto
      })
      state.filas = filas
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

  const leerExcel = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    const excel = formData.get('excel')
    if (excel instanceof Blob) {
      const listWorksheet: WorksheetItem[] = []
      const reader = new FileReader()
      reader.readAsArrayBuffer(excel)
      reader.onloadend = (e) => {
        try {
          if (e.target && e.target.result) {
            const data = new Uint8Array(e.target.result as ArrayBuffer)
            const excelRead = XLSX.read(data, {
              type: 'array'
            })

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
          } else {
            console.log('target result error')
          }
        } catch (error) {
          console.error('Target result error', error)
        }
      }
    } else {
      console.log('Blob error')
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
