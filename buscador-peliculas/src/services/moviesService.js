

export const searchMovies = async ({ search }) =>{
    if(search) {
        //
        fetch(`https://www.omdbapi.com/?apikey=a91abe80&s=${search}`)
        .then(res => res.json()) 
        .then(json => {
          setResponseMovies(json)
        })
      }else {
          setResponseMovies(withoutResult)
      }
}