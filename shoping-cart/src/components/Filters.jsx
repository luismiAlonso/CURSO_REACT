import './Filters.css'
import { useState, useId } from 'react'

export function Filters({ onChange }) {

    const [minPrice, setMinPrice] = useState(0)
    const minPriceFilterID = useId()
    const categoryFiletrID = useId()
 
    const handleChangeMinPrice = (event) => {
        setMinPrice(event.target.value)
        onChange(prevState =>({
          ...prevState,
          minPrice: event.target.value   
        }))
    }
    
    const handleChangeCategory = (event) => {
        onChange(prevState =>({
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
                />
                <span>${minPrice}</span>
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