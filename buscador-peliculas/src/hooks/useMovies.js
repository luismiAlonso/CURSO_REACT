import withResult from '../moks/with_result.json'
import withoutResult from '../moks/no_result.json'
import { useState } from 'react'


export function useMovies ({search}) {
    const [responseMovies, setResponseMovies] = useState([]) 

    const movies = responseMovies.Search

    const mappedMovies = movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))

    const getMovies= () =>{
    
    }

    return { movies: mappedMovies, getMovies }
}