import { ref } from 'vue'
import useAxios from '../../axios.config'
import useFavorite from '../composables/favorite'
const { getFavorite, favorite } = useFavorite()
const { axiosInstance } = useAxios()

const pokemonList = ref([])

const favoritePokemons = () => {
  const arr = pokemonList.value
  getFavorite()
  const fav = favorite.value

  for (let i = 0; i < arr.length; i++) {
    for (let id = 0; id < fav.length; id++) {
      if (arr[i].id === fav[id])
        arr[i].favorite = true
    }
  }
}
const usePokemonList = () => {
  const getPokemons = async (payload) => {
    const fetched = await axiosInstance.get(`pokemon?limit=21&offset=${payload ? pokemonList.value.length : 0}`)
    if (fetched.status === 200) {
      const arr = fetched.data.results
      for (let i = 0; i < arr.length; i++) {
        const perPokemon = await axiosInstance.get(arr[i].url)
        pokemonList.value.push(perPokemon.data)
      }
    }
    favoritePokemons()
  }
  return { getPokemons, pokemonList, favoritePokemons }
}

export default usePokemonList
