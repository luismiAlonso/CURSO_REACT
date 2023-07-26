const CAT_ENDPOINT_RANDOM_FACTS = 'https://catfact.ninja/fact'

export const getRandomFacts = () => {
  return fetch(CAT_ENDPOINT_RANDOM_FACTS)
    .then(res => res.json())
    .then(data => {
      const { fact } = data
      return fact
    })
}
