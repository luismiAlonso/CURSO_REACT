import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import { useRef } from 'react'
//const urlApi =//www.omdbapi.com/?apikey=a91abe80&s=avenger

function App () {

 const { movies: mappedMovies } = useMovies()
 const imputRef = useRef()
const  [ query, setQuery ] = useState()
 /*const handleClick = () =>{
   const value = imputRef.current.value
   console.log(value)
 }*/
//FORMA NO CONTROLADA
 const handleSubmit = (event) => {
   event.preventDefault()
   /*const value = imputRef.current.value
   console.log(value) */
   /*const fields = new FormData(event.target)
   const query = fields.get('query')*/

   //const res = new window.FormData(event.target)
   const { query } = Object.fromEntries(new window.FormData(event.target))
   console.log(query) 
 }
 //FORMA CONTROLADA

    return (
      <div className='page'>

        <header>
          <form className ='form' onSubmit={ handleSubmit }>    
            <input value={query} name='query' ref = { imputRef } placeholder='Avenger...' />
            <button  type='submit'>Buscar</button>
          </form>
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

