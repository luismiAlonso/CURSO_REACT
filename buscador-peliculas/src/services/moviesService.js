import { configEnv } from "../configEnv"

export const searchMovies = async ({search}) =>{

  if(search === '') return null
    try {

      const  response = await  fetch(`https://www.omdbapi.com/?apikey=${configEnv.apiKey}&s=${search}`)
      const json = await response.json()

      const movies = json.Search

      return  movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }))
    }catch ({error}){
      throw new Error('Error searching movies')
    }
 
}