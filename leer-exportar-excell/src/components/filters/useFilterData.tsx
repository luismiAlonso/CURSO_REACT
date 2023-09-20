import { useState } from 'react'
import { ordenarDatos } from './utilFiters'

const useFilterData = () => {
  const [sortedDataProperties, setSortedDataProperties] = useState<string[]>()

  const filterData = (newData:string[],property:string,orden:'asc'| 'desc') => {

    let newSortedProperties: string[] = []
    console.log(property)

    if (newData !== undefined && newData.length > 0 && property!==undefined && orden!==undefined) {
      newSortedProperties = ordenarDatos(newData, property, orden)
      setSortedDataProperties(newSortedProperties)
    }else{
      console.log("no pudieron ordenarse")
    }
  }

  return {
    sortedDataProperties,
    filterData
  }
}

export default useFilterData
