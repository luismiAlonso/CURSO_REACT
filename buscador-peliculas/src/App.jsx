import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import { useEffect, useRef,useState } from 'react'
//const urlApi =//www.omdbapi.com/?apikey=a91abe80&s=avenger

function userSearch () {

  const [sort, setSort] = useState(false)

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
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = userSearch()
  const { movies, loading , getMovies} = useMovies({search, sort})


  const handleSort = () => {
    setSort(!sort)
  }
  


//FORMA NO CONTROLADA
 const handleSubmit = (event) => {
   event.preventDefault()
   getMovies({search})
   /*const value = imputRef.current.value
   console.log(value) */
   /*const fields = new FormData(event.target)
   const query = fields.get('query')*/

   //const res = new window.FormData(event.target)
   //const { query } = Object.fromEntries(new window.FormData(event.target))
 }

 //controlador para cambio en la entrada
 const handleChange = (event) => {
  const newSearch = event.target.value
  if(newSearch.startsWith(' ')) return
    updateSearch(event.target.value)
    getMovies({ search: newSearch })
 }
    return (
      <div className='page'>

        <header>
          <form className ='form' onSubmit={ handleSubmit }>    
            <input onChange={handleChange} value={search} name='query' placeholder='Avenger...' />
            <label> Order </label>
            <input type='checkbox' onChange={handleSort} checked={sort} />
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{color:'red'}}>{error}</p> }
        </header>

        <main>
          {
            loading ? <p>Loading movies ... </p> : <Movies movies = { movies } />
          }
        </main>
      </div>

    )
}

export default App

