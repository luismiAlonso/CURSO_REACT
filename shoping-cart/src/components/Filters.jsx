import { useFilters } from '../hooks/useFilters'
import { useId } from 'react'
import './Filters.css'

export function Filters() {

    const {filters ,setFilters } = useFilters()

    const minPriceFilterID = useId()
    const categoryFiletrID = useId()
 
    const handleChangeMinPrice = (event) => {
        setFilters(prevState =>({
          ...prevState,
          minPrice: event.target.value   
        }))
    }
    
    const handleChangeCategory = (event) => {
        setFilters(prevState =>({
            ...prevState,
            category: event.target.value   
        }))
    }

    return (
         <section className='filters'>
            <div>
                <label htmlFor='price'>Precio a partir de: </label>
                <input
                    type='range'
                    id={minPriceFilterID}
                    min='0'
                    max='1000' 
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor='category'>Categoría</label>
                <select id={categoryFiletrID} onChange={handleChangeCategory}>
                    <option value = 'all'>Todas</option>
                    <option value = 'laptops'>Portátiles</option>
                    <option value = 'smartphones'>Móviles</option>
                </select>
            </div>
         </section>
    )
}