import { createContext, useState } from "react"

//1- crear el contexto
export const FilterContext = createContext()

//2- proveer el contexto 
export function FiltersProvider ({ children }) {
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice:0
    })
    return (
        <FilterContext.Provider value = {{
            filters,
            setFilters
        }}
        >
          {children}
        </FilterContext.Provider>
    )
}

