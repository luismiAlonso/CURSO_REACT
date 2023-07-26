import responseMovies from '../moks/with_result.json'
import withoutResult from '../moks/no_result.json'


export function useMovies () {

    const movies = responseMovies.Search

    const mappedMovies = movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))

    return { movies: mappedMovies }
}