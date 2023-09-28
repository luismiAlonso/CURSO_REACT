export function sortData(
  data: any[],
  propiedad: string,
  orden: 'asc' | 'desc'
): string[] {
  // Llamar al método de ordenación correspondiente según el tipo de dato
  let copiaOrdenada: string[] = []
  try {
    if (data === undefined || data.length === 0) {
      return copiaOrdenada
    }
    // Verificar el tipo de dato de la propiedad
    const primerElemento = data[0]
    let tipoDato: 'string' | 'number' | 'date'
    if (isNumber(primerElemento[propiedad])) {
      tipoDato = 'number'
    } else if (isDate(primerElemento[propiedad])) {
      tipoDato = 'date'
    } else {
      tipoDato = 'string'
    }
   //console.log(tipoDato)
    switch (tipoDato) {
      case 'number':
        copiaOrdenada = ordenarNumeros(data, propiedad, orden)
        break
      case 'date':
        copiaOrdenada = ordenarFechas(data, propiedad, orden)
        break
      default:
        copiaOrdenada = ordenarCadenas(data, propiedad, orden)
    }
  } catch (error) {
    console.log(error)
    return data
  }

  return copiaOrdenada
}

export function sortDataByInputFill(
  data: string[],
  palabra: string,
  propiedad: string,
  orden: 'asc' | 'desc'
): string[] {
  // Llamar al método de ordenación correspondiente según el tipo de dato
  let copiaOrdenada: string[] = []
  try {
    if (data === undefined || data.length === 0) {
      return copiaOrdenada
    }
    // Verificar el tipo de dato de la propiedad
    const primerElemento = data[0]

    let tipoDato: 'string' | 'number' | 'date'
    if (isNumber(primerElemento[propiedad])) {
      tipoDato = 'number'
    } else if (isDate(primerElemento[propiedad])) {
      tipoDato = 'date'
    } else {
      tipoDato = 'string'
    }

    switch (tipoDato) {
      case 'number':
        copiaOrdenada = filtrarYOrdenarNumeros(data, palabra, propiedad, orden)
        break
      case 'date':
        //copiaOrdenada = filtrarYOrdenarFechas(data, palabra, propiedad, orden)
        copiaOrdenada = filtrarYOrdenarCadenas(data, palabra, propiedad, orden)
        break
      default:
        copiaOrdenada = filtrarYOrdenarCadenas(data, palabra, propiedad, orden)
    }
  } catch (error) {
    console.log(error)
    return data
  }

  return copiaOrdenada
}

function ordenarCadenas(
  data: any[],
  propiedad: string,
  orden: 'asc' | 'desc'
): string[] {
  try {
    const sortedData = [...data]
    sortedData.sort((a, b) => {
      const valorA = a[propiedad]
      const valorB = b[propiedad]

      // Verificar si los valores son strings válidos
      if (typeof valorA === 'string' && typeof valorB === 'string') {
        if (orden === 'asc') {
          return valorA.localeCompare(valorB)
        } else {
          return valorB.localeCompare(valorA)
        }
      } else if (typeof valorA === 'string') {
        // Si valorB no es un string válido, se considera valorA "mayor"
        return orden === 'asc' ? 1 : -1
      } else if (typeof valorB === 'string') {
        // Si valorA no es un string válido, se considera valorB "mayor"
        return orden === 'asc' ? -1 : 1
      } else {
        // Ambos valores no son strings válidos, se consideran iguales
        return 0
      }
    })
    return sortedData
  } catch (error) {
    console.error(error)
    return []
  }
}

function ordenarNumeros(
  data: any[],
  propiedad: string,
  orden: 'asc' | 'desc'
): string[] {
  try {
    const sortedData = [...data]
    sortedData.sort((a, b) => {
      const numA = parseFloat(a[propiedad])
      const numB = parseFloat(b[propiedad])

      if (isNaN(numA) && isNaN(numB)) {
        return 0
      } else if (isNaN(numA)) {
        return orden === 'asc' ? -1 : 1
      } else if (isNaN(numB)) {
        return orden === 'asc' ? 1 : -1
      } else {
        return orden === 'asc' ? numA - numB : numB - numA
      }
    })

    return sortedData
  } catch (error) {
    console.error(error)
    return []
  }
}

function ordenarFechas(
  data: any[],
  propiedad: string,
  orden: 'asc' | 'desc'
): string[] {
  try {
    const sortedData = [...data]

    sortedData.sort((a, b) => {
      const dateA = new Date(a[propiedad])
      const dateB = new Date(b[propiedad])

      if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) {
        return 0
      } else if (isNaN(dateA.getTime())) {
        return orden === 'asc' ? -1 : 1
      } else if (isNaN(dateB.getTime())) {
        return orden === 'asc' ? 1 : -1
      } else {
        return orden === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      }
    })

    return sortedData
  } catch (error) {
    console.error(error)
    return []
  }
}

function filtrarYOrdenarCadenas(
  data: any[],
  palabra: string,
  propiedad: string,
  orden: 'asc' | 'desc'
): string[] {
  try {
    const filteredData = data
      .filter(
        (item) =>
          item[propiedad] != null &&
          String(item[propiedad]).toLowerCase().includes(palabra.toLowerCase())
      )
      .sort((a, b) =>
        orden === 'asc'
          ? String(a[propiedad] || '').localeCompare(String(b[propiedad] || ''))
          : String(b[propiedad] || '').localeCompare(String(a[propiedad] || ''))
      )
    return filteredData
  } catch (error) {
    console.log(error)
    return []
  }
}

function filtrarYOrdenarNumeros(
  data: any[],
  palabra: string,
  propiedad: string,
  orden: 'asc' | 'desc'
): string[] {
  try {
    return data
      .filter(
        (item) =>
          item[propiedad] != null &&
          item[propiedad].toString().includes(palabra)
      )
      .sort((a, b) =>
        orden === 'asc'
          ? (parseFloat(a[propiedad]) || 0) - (parseFloat(b[propiedad]) || 0)
          : (parseFloat(b[propiedad]) || 0) - (parseFloat(a[propiedad]) || 0)
      )
  } catch (error) {
    console.log(error)
    return []
  }
}

function filtrarYOrdenarFechas(
  data: any[],
  palabra: string,
  propiedad: string,
  orden: 'asc' | 'desc'
): string[] {
  try {
    const filteredData = data
      .filter((item) => {
        if (item[propiedad]) {
          const formattedDate = new Date(item[propiedad])
            .toLocaleDateString('en-GB')
            .trim()
          return formattedDate.includes(palabra)
        }
        return false
      })
      .sort((a, b) => {
        const dateA = new Date(a[propiedad] || 0)
        const dateB = new Date(b[propiedad] || 0)
        return orden === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      })
    return filteredData
  } catch (error) {
    console.log(error)
    return []
  }
}

export function isDate(dateStr: string) {
  const regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)?\d{2}$/
  if (regex.test(dateStr)) return true
  return false
}

export function isNumber(numberStr: string) {
  const regex = /^-?\d*\.?\d+$/
  if (regex.test(numberStr)) return true
  return false
}
/*
  export function filtrarDatos(
    data: objctData[],
    filtro: string,
    propiedad: string
  ): objctData[] {
    // Implementa la lógica de filtrado aquí
    // Puedes usar filter() para filtrar los datos según tu criterio
    // Ejemplo:
    // return data.filter(item => item[propiedad].includes(filtro));
  
    // Por ahora, retornemos todos los datos sin filtrar
    return data;
  }*/
