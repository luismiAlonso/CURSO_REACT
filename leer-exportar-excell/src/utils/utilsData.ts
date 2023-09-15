export function obtenerExtensionDeArchivo(archivo: Blob | File) {
  if (archivo instanceof File) {
    const nombreArchivo = archivo.name
    const partes = nombreArchivo.split('.')

    if (partes.length > 1) {
      return partes[partes.length - 1]
    }
  }
  return '' // Retorna "" si no se pudo determinar la extensión
}

export function mapearArrayJSON<T>(arrayJSON: string[]): T[] {
  return arrayJSON.map((cadena) => JSON.parse(cadena) as T)
}

export function numeroAFecha(numero: number) {
  // Restar 1 para ajustar al día base
  numero--

  // Calcular los años completos
  const aniosCompletos = Math.floor(numero / 365)

  // Calcular el residuo de días
  let diasRestantes = numero % 365

  // Calcular los meses completos y el día restante
  let mesesCompletos = 0
  let dia = 0
  for (let mes = 1; mes <= 12; mes++) {
    const diasEnMes = new Date(aniosCompletos + 1, mes, 0).getDate()
    if (diasRestantes - diasEnMes < 0) {
      mesesCompletos = mes
      dia = diasRestantes + 1 // Sumar 1 para ajustar al día base (1 de enero)
      break
    }
    diasRestantes -= diasEnMes
  }

  // Calcular el año final
  const anioFinal = 2022 + aniosCompletos // Asumiendo que 2022 es el año base

  // Devolver la fecha en formato "dd/mm/yyyy"
  const fecha = `${dia}/${mesesCompletos}/${anioFinal}`
  return fecha
}

export function checkFecha(data: string) {
  const regexFecha = new RegExp('/^(d{1,2})/(d{1,2})/(d{4})$/')
  const coincidencia = regexFecha.exec(data)
  return coincidencia
}
