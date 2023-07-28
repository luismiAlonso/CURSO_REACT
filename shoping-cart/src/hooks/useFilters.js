import { FilterContext } from "../context/filterContext"
import { useContext } from 'react'

export function useFilters () {

    const {filters, setFilters } = useContext(FilterContext)
  
    const filterProducts = (products) => {
      return products.filter(product => {
        return (
          product.price >= filters.minPrice &&
          (
            filters.category === 'all' || 
            product.category === filters.category
          )
          )
        })
     }
  
     return { filters, filterProducts, setFilters }
  }