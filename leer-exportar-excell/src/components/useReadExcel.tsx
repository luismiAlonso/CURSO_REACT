import React, { useState } from "react"
import { State, ExcelRow, WorksheetItem } from "../interfaces/Istate"
import * as XLSX from "xlsx"

function useReadExcel() {
  const initialState: State = {
    nameDoc: "",
    woorksheets: [],
    hoja: undefined,
    filas: [],
    propiedades: [],
    status: false
  }
  const [state, setState] = useState(initialState)
  const estadoInicialLocal = { ...initialState };

  const selectHoja = React.createRef<HTMLSelectElement>()

  const leerFilas = (index: number) => {
    try {
      const hoja = estadoInicialLocal.woorksheets[index]
      const filas: ExcelRow[] = XLSX.utils.sheet_to_json(hoja)
      setState({ ...estadoInicialLocal, filas, hoja })
    } catch (error) {
      console.error("Error al leer filas", error)
    }
  }

  const leerPropiedades = (index: number) => {
    try {
      const hoja = estadoInicialLocal.woorksheets[index]
      const propiedades: string[] = []

      for (const key in hoja.data) {
        const regEx = new RegExp("^(\\w)(1){1}$")
        if (regEx.test(key)) {
          console.log(hoja.data[key].v)
          propiedades.push(hoja.data[key].v)
        }
      }
      setState({ ...estadoInicialLocal, propiedades })
    } catch (error) {
      console.error("Error al leer propiedades", error)
    }
  }

  const cambiarHoja = () => {
    if (selectHoja.current !== null) {
      try {
        leerPropiedades(Number(selectHoja.current.value))
        leerFilas(Number(selectHoja.current.value))
        setState({ ...estadoInicialLocal })
      } catch (error) {
        console.error("Error al cambiar de Hoja", error)
      }
    }
  }

  const leerExcel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const excel = formData.get("excel")
    if (excel instanceof Blob) {
      const listWorksheet: WorksheetItem[] = []
      const reader = new FileReader()
      reader.readAsArrayBuffer(excel)
      reader.onloadend = (e) => {
        try {
          if (e.target && e.target.result) {
            const data = new Uint8Array(e.target.result as ArrayBuffer)
            const excelRead = XLSX.read(data, { type: "array" })

            excelRead.SheetNames.forEach(function (SheetNames, index) {
              if (Array.isArray(excelRead.SheetNames)) {
                listWorksheet.push({
                  data: excelRead.Sheets[SheetNames],
                  name: SheetNames,
                  index: index
                })
              }
            })

            console.log(listWorksheet)
            estadoInicialLocal.woorksheets = listWorksheet
            estadoInicialLocal.status = true
            leerPropiedades(0)
            leerFilas(0)
            setState(estadoInicialLocal)
            console.log(state.woorksheets)
          } else {
            console.log("target result error")
          }
        } catch (error) {
          console.error("Target result error", error)
        }
      }
    } else {
      console.log("Blob error")
    }
  }

  return {
    state,
    selectHoja,
    cambiarHoja,
    setState,
    leerFilas,
    leerPropiedades,
    leerExcel
  }
}

export default useReadExcel
