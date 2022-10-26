<script setup>
import { defineComponent, inject, onMounted, ref, watch } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import axios from 'axios'
import PokemonCard from '../components/pokemonCards.vue'
import SkeletonCards from '../components/skeletonsCard.vue'
import PokemonDetail from '../components/pokemonDetail.vue'
defineComponent({
  components: {
    PokemonCard,
    SkeletonCards,
    PokemonDetail,
  },
})

const $pokeDex = inject('$pokeDex')
const loading = ref(true)
const pokemonList = ref([])
const el = ref(null)
const open = ref(false)
const detail = ref({})
const pokemonTypes = ref([])
const valueFilter = ref('')

const types = () => {
  const allType = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
    'unknown',
    'shadow',
    'all',
  ]
  allType.sort()
  pokemonTypes.value = allType
}
types()

const getPokemons = async (payload) => {
  const fetched = await axios.get(`${$pokeDex}pokemon?limit=21&offset=${payload ? pokemonList.value.length : 0}`)
  if (fetched.status === 200) {
    const arr = fetched.data.results
    for (let i = 0; i < arr.length; i++) {
      const perPokemon = await axios.get(arr[i].url)
      pokemonList.value.push(perPokemon.data)
      loading.value = false
    }
  }
}

const getDetailPokemon = (payload) => {
  detail.value = payload
  open.value = true
}

async function Filter(payload) {
  if (payload === 'all') {
    pokemonList.value = []
    getPokemons()
    return
  }
  try {
    const filtered = await axios.get(`${$pokeDex}type/${payload}`)
    const arr = filtered.data.pokemon
    pokemonList.value = []
    for (let i = 0; i < arr.length; i++) {
      const perPokemon = await axios.get(arr[i].pokemon.url)
      pokemonList.value.push(perPokemon.data)
      loading.value = false
    }
  }
  catch (error) {
    console.log(error)
  }
}

watch(valueFilter, (val) => {
  if (val)
    Filter(val)
})

useInfiniteScroll(
  el,
  () => {
    getPokemons(true)
  },
  { distance: 21 },
)

onMounted(() => {
  getPokemons()
})
</script>

<template>
  <div class="container h-full mx-auto">
    <div class="mx-auto max-w-7xl h-[10vh] my-auto grid place-items-center">
      <label for="filter">Filter pokemon by type</label>
      <select id="filter" v-model="valueFilter" class="select w-full max-w-xs bg-white text-slate-500">
        <option v-for="T in pokemonTypes" :key="T.id" :value="T">
          {{ T }}
        </option>
      </select>
    </div>

    <div class="pt-6 flex max-w-7xl mx-auto h-[90vh] overflow-hidden ">
      <div v-if="!loading" ref="el" class="w-2/3 overflow-y-scroll h-full flex items-center justify-between gap-y-10 flex-wrap mx-auto">
        <PokemonCard v-for="item in pokemonList" :key="item.idx" class="cursor-pointer" :name="item.name" :img="item.sprites.front_default" :types="item.types" @click="getDetailPokemon(item)" />
      </div>
      <div v-else class="w-2/3 flex items-center justify-between gap-y-10 flex-wrap">
        <SkeletonCards v-for="item in 21" :key="item" class="animate-pulse" />
      </div>
    </div>
  </div>
  <PokemonDetail :open="open" :detail="detail" @close="open = false" />
</template>
