import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import { useEffect, useRef,useState } from 'react'
//const urlApi =//www.omdbapi.com/?apikey=a91abe80&s=avenger

function userSearch () {

  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

useEffect(()=> {

  if(isFirstInput.current){
    isFirstInput.current = search === ''
    return
  }

  if(search === '' ) {
    setError('El campo esta vacio')
    return
  }
  if(search.match(/^\d+$/)) {
    setError('No se puede buscar una pelicula con un numero')
    return
  }

  setError(null)

 },[search]) 

 return {search, updateSearch, error}
}

function App () {

 const { search, updateSearch, error } = userSearch()
 const { movies: mappedMovies, getMovies} = useMovies({search})

 /*
 const handleClick = () =>{
   //const value = imputRef.current.value
 }
 */

//FORMA NO CONTROLADA
 const handleSubmit = (event) => {
   event.preventDefault()
   /*const value = imputRef.current.value
   console.log(value) */
   /*const fields = new FormData(event.target)
   const query = fields.get('query')*/

   //const res = new window.FormData(event.target)
   //const { query } = Object.fromEntries(new window.FormData(event.target))
   getMovies({search})
 }

 //controlador para cambio en la entrada
 const handleChange = (event) =>{
  const newQuery = event.target.value
  if(newQuery.startsWith(' ')) return
    updateSearch(event.target.value)
 }
    return (
      <div className='page'>

        <header>
          <form className ='form' onSubmit={ handleSubmit }>    
            <input onChange={handleChange} value={search} name='query' placeholder='Avenger...' />
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{color:'red'}}>{error}</p> }
        </header>

        <main>
          {
            <Movies movies = { mappedMovies } />
          }
        </main>
      </div>

    )
}

export default App

