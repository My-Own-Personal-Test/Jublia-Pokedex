import axios from 'axios'
import usePokemonList from './pokemonList'

const { getPokemons, pokemonList } = usePokemonList()

const useFilterPokemon = () => {
  const Filter = async (payload) => {
    if (payload === 'all') {
      pokemonList.value = []
      getPokemons()
      return
    }
    const filtered = await axios.get(`${import.meta.env.VITE_BASE_URL}type/${payload}`)
    const arr = filtered.data.pokemon
    pokemonList.value = []
    for (let i = 0; i < arr.length; i++) {
      const perPokemon = await axios.get(arr[i].pokemon.url)
      pokemonList.value.push(perPokemon.data)
    }
  }
  return { Filter }
}

export default useFilterPokemon
