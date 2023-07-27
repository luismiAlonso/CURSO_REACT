export function ListOfMovies({ movies }) {

  return (
    <ul className="movieGrid">
        {
           movies.map(movie => (
            <li className="movie" key={movie.id} >
              <h3 >{movie.title}</h3>
              <h3>{movie.year}</h3>
              <img src={movie.poster} alt={movie.title} />
            </li>
          ))
        }
    </ul>
  )
}

export function NoMoviesResults() {
  return (
    <p>No se encontraron resultados</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0
    
    return (
        hasMovies
        ? <ListOfMovies movies={movies} />
        : <NoMoviesResults />
    )
}