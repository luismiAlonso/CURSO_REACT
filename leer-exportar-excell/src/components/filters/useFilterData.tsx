import { useState } from 'react'
import { ordenarDatos } from './utilFiters'

const useFilterData = () => {
  const [sortedDataProperties, setSortedDataProperties] = useState<string[]>()
  const [property, setProperty] = useState<string>()
  const [ordenProperties, setOrdenProperties] = useState<'desc' | 'asc'>()
  const [isFiltered,setFiltered] = useState(false)

  const filterData = async (newData:string[],newProperty:string,newOrder:"desc" | "asc") => {
    return new Promise((resolve, reject) => {
      try {
        setFiltered(false)
        if (
          !newData ||
          newData.length === 0 ||
          !newProperty ||
          !newOrder
        ) {
          console.log('No se pudieron ordenar los datos.')
          reject(false) // Indica que no se pudieron ordenar los datos
        }
        setProperty(property)
        setOrdenProperties(ordenProperties)
        const newSortedProperties = ordenarDatos(
          newData,
          newProperty,
          newOrder
        )

        setSortedDataProperties(newSortedProperties)
        setFiltered(true)
        resolve(newSortedProperties) // Indica que los datos están ordenados y listos
        
      } catch (error) {
        setFiltered(false)
        console.error('Error en filterData:', error)
        reject(error) // Rechaza la promesa con el error
        reject(false) // Indica que no se pudieron ordenar los datos
 
      }
    })
  }

  const filterByWords = async(newData:string[],searchWord:string,newProperty:string,newOrder:"desc" | "asc") =>{

    return new Promise((resolve, reject) => {
      try {
        setFiltered(false)
         if (
          !newData ||
          newData.length === 0 ||
          !newProperty ||
          !newOrder
        ) {
          console.log('Error en los datos de entrada...')
          reject(false) // Indica que no se pudieron ordenar los datos
        }

        const filteredData = newData.filter(item => item[newProperty].includes(searchWord))

        setFiltered(true)
        resolve(filteredData) // Indica que los datos están ordenados y listos
        
      } catch (error) {
        setFiltered(false)
        console.error('Error en filterData:', error)
        reject(error) // Rechaza la promesa con el error
        reject(false) // Indica que no se pudieron ordenar los datos
 
      }
    })
  }

  return {
    sortedDataProperties,
    ordenProperties,
    isFiltered,
    setOrdenProperties,
    setProperty,
    filterData,
    filterByWords
  }
}

export default useFilterData
