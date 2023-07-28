import { Filters } from './Filters.jsx'
import { ClearCartIcon } from './icons'

export function Header({ changeFilters }) {

    return (
        <header>
            <h1>React Shop <ClearCartIcon /></h1>
            <Filters onChange = {changeFilters} />
        </header>
    )
}