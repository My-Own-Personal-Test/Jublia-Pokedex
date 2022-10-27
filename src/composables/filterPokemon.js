import useAxios from '../../axios.config'
import usePokemonList from './pokemonList'

const { getPokemons, pokemonList } = usePokemonList()
const { axiosInstance } = useAxios()

const useFilterPokemon = () => {
  const Filter = async (payload) => {
    // this condition block statements is checking the value fro the param: payload, if the value is 'all' then it will get all the pokemons from the API then stop the whole function process and if the value is not 'all' then it will continue the function process and get the pokemons list by type
    if (payload === 'all') {
      pokemonList.value = []
      getPokemons()
      return
    }
    const filtered = await axiosInstance.get(`type/${payload}`)
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
