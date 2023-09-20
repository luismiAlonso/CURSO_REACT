export function ordenarDatos(
  data: string[],
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
    if ((/^-?\d*\.?\d+$/).test(primerElemento[propiedad])){
      tipoDato = 'number'
    } else if ((/^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)?\d{2}$/).test(primerElemento[propiedad])) {
      tipoDato = 'date'
    }else{
      tipoDato = 'string'
    }

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

function ordenarCadenas(
  data: string[],
  propiedad: string,
  orden: 'asc' | 'desc'
): string[] {
  const sortedData = [...data]
  sortedData.sort((a, b) => {
    if (orden === 'asc') {
      return a[propiedad].localeCompare(b[propiedad])
    } else {
      return b[propiedad].localeCompare(a[propiedad])
    }
  })
  return sortedData
}

function ordenarNumeros(
  data: string[],
  propiedad: string,
  orden: 'asc' | 'desc'
): string[] {
  const sortedData = [...data]

  sortedData.sort((a, b) => {
    const numA = parseFloat(a[propiedad])
    const numB = parseFloat(b[propiedad])

    if (orden === 'asc') {
      return numA - numB
    } else {
      return numB - numA
    }
  })

  return sortedData
}

function ordenarFechas(
  data: string[],
  propiedad: string,
  orden: 'asc' | 'desc'
): string[] {
  const sortedData = [...data]

  sortedData.sort((a, b) => {
    const dateA = new Date(a[propiedad])
    const dateB = new Date(b[propiedad])

    if (orden === 'asc') {
      return dateA.getTime() - dateB.getTime()
    } else {
      return dateB.getTime() - dateA.getTime()
    }
  })

  return sortedData
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
