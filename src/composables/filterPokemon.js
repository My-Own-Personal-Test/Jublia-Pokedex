import useAxios from '../../axios.config'
import usePokemonList from './pokemonList'

const { getPokemons, pokemonList } = usePokemonList()
const { axiosInstance } = useAxios()

const useFilterPokemon = () => {
  const Filter = async (payload) => {
    if (payload === 'all') {
      pokemonList.value = []
      getPokemons()
      return
    }
    const filtered = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}type/${payload}`)
    const arr = filtered.data.pokemon
    pokemonList.value = []
    for (let i = 0; i < arr.length; i++) {
      const perPokemon = await axiosInstance.get(arr[i].pokemon.url)
      pokemonList.value.push(perPokemon.data)
    }
  }
  return { Filter }
}

export default useFilterPokemon
