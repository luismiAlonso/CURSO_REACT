import { useState,useRef,useMemo, useCallback} from 'react'
import { searchMovies } from '../services/moviesService'


export function useMovies ({search, sort}) {
  const [movies, setMovies] = useState([]) 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const  previousSearch = useRef(search)

  const getMovies = useCallback( async ({search}) =>{
    //inyeccion por parametro, no recupera de la inyeccion del padre 
      if (search === previousSearch.current) return

      try{
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({search})
        setMovies(newMovies)
      }catch({e}) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    },[])

  const sortedMovies = useMemo(() => {
    //console.log('memoSortedMovies')
    return sort
      ? [ ...movies].sort((a,b) => a.title.localeCompare(b.title) )
      : movies
  }, [sort, movies])
  
  return { movies:sortedMovies , loading , getMovies }
}