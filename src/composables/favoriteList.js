import useAxios from '../../axios.config'
import usePokemonList from './pokemonList'

const { pokemonList, favoritePokemons } = usePokemonList()
const { axiosInstance } = useAxios()

const useFavoriteList = () => {
  const favorites = JSON.parse(localStorage.getItem('favorite'))
  const faveList = async () => {
    pokemonList.value = []
    for (let index = 0; index < favorites.length; index++) {
      const pokemon = await axiosInstance.get(`pokemon/${favorites[index]}`)
      pokemonList.value.push(pokemon.data)
      favoritePokemons()
    }
  }
  return { faveList }
}

export default useFavoriteList
