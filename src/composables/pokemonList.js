import { ref } from 'vue'
import useAxios from '../../axios.config'
import useFavorite from '../composables/favorite'
const { getFavorite, favorite } = useFavorite()
const { axiosInstance } = useAxios()

const pokemonList = ref([])

// this composable function is the main functin for the app. It will get all the pokemon list
const favoritePokemons = () => {
  const arr = pokemonList.value
  getFavorite()
  const fav = favorite.value

  // this nested looping use for diff 2 arrays between pokemonList and favorite, if theres a match between 2 arrayys. It will update the pokemonList array new property called favorite and set it to true for UI purpose
  for (let i = 0; i < arr.length; i++) {
    for (let id = 0; id < fav.length; id++) {
      if (arr[i].id === fav[id])
        arr[i].favorite = true
    }
  }
}
const usePokemonList = () => {
  const getPokemons = async (payload) => {
    // payload contain true or not contain value at all, the purpose of payload if the value is true, then it will get the next page of the pokemon list and vice versa
    const fetched = await axiosInstance.get(`pokemon?limit=21&offset=${payload ? pokemonList.value.length : 0}`)
    if (fetched.status === 200) {
      const arr = fetched.data.results
      for (let i = 0; i < arr.length; i++) {
        const perPokemon = await axiosInstance.get(arr[i].url)
        pokemonList.value.push(perPokemon.data)
      }
    }
    // this function is used to update the pokemonList before show to the UI
    favoritePokemons()
  }
  return { getPokemons, pokemonList, favoritePokemons }
}

export default usePokemonList
