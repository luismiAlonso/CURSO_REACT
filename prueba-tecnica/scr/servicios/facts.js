const CAT_ENDPOINT_RANDOM_FACTS = 'https://catfact.ninja/fact'

export const getRandomFacts = () => {
  return fetch(CAT_ENDPOINT_RANDOM_FACTS)
    .then(res => res.json())
    .then(data => {
      const { fact } = data
      return fact
    })
}

//requiere el fact
export const getImageUrl = (fact) => {
  const firstWord = fact.split(' ', 3).join(' ')
  return fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
    .then(res => res.json())
    .then(response => {
      const { url } = response
      return url
    })
}
