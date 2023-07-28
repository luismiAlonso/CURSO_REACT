import { Filters } from './Filters.jsx'
import { ClearCartIcon } from './icons'

export function Header() {

    return (
        <header>
            <h1>React Shop <ClearCartIcon /></h1>
            <Filters />
        </header>
    )
}