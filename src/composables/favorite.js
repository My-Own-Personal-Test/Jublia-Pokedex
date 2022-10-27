import { ref } from 'vue'

// this composable function is used when user click a button to save a pokemon as favorite and save it to localStorage
const useFavorite = () => {
  const favorite = ref([])

  // this function is used to get the favorite pokemons from localStorage and consume it in the pokemonList
  const getFavorite = () => {
    const data = localStorage.getItem('favorite')
    if (data)
      favorite.value = JSON.parse(data)
  }
  getFavorite()

  const saveFavorite = (data) => {
    const isExist = favorite.value.find(item => item === data)
    // this condition block statements is used to check if the pokemon is already in the favorite list or not
    if (!isExist)
      favorite.value.push(data)

    localStorage.setItem('favorite', JSON.stringify(favorite.value))
  }

  return { favorite, saveFavorite, getFavorite }
}

export default useFavorite
