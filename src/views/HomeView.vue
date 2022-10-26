<script setup>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import useFavoriteList from '../composables/favoriteList'
import useFilterPokemon from '../composables/filterPokemon'
import usePokemonList from '../composables/pokemonList'
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

const loading = ref(true)
const el = ref(null)
const open = ref(false)
const detail = ref({})
const pokemonTypes = ref([])
const valueFilter = ref('')
const faveButton = ref(false)
const { getPokemons, pokemonList } = usePokemonList()
const { Filter } = useFilterPokemon()
const { faveList } = useFavoriteList()

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

const getDetailPokemon = (payload) => {
  detail.value = payload
  open.value = true
}

const close = (payload) => {
  if (payload.asFave) {
    getPokemons()
    open.value = false
  }
  else {
    open.value = false
  }
}

const showFavorties = async () => {
  if (!faveButton.value) {
    faveList()
    loading.value = false
    faveButton.value = true
  }
  else {
    pokemonList.value = []
    getPokemons()
    faveButton.value = false
  }
}

watch(valueFilter, async (val) => {
  loading.value = true
  if (val) {
    await Filter(val)
    loading.value = false
  }
})

useInfiniteScroll(
  el,
  () => {
    getPokemons(true)
  },
  { distance: 21 },
)

onMounted(async () => {
  await getPokemons()
  loading.value = false
})
</script>

<template>
  <div class="container h-full mx-auto">
    <div class="mx-auto max-w-7xl h-[10vh] my-auto flex justify-center items-center gap-4">
      <div>
        <label for="filter">Filter pokemon by type</label>
        <select id="filter" v-model="valueFilter" class="select w-full max-w-xs bg-white text-slate-500">
          <option v-for="T in pokemonTypes" :key="T.id" :value="T">
            {{ T }}
          </option>
        </select>
      </div>
      <div class="mt-5">
        <button class="py-2 px-4 bg-transparent border border-solid border-slate-800 text-slate-600 rounded-lg" @click="showFavorties">
          {{ faveButton ? 'Show All' : 'Show Favorites' }}
        </button>
      </div>
    </div>

    <div class="pt-6 flex max-w-7xl mx-auto h-[90vh] overflow-hidden ">
      <div v-if="!loading" ref="el" class="w-2/3 overflow-y-scroll h-full flex items-center justify-between gap-y-10 flex-wrap mx-auto">
        <PokemonCard v-for="item in pokemonList" :key="item.idx" class="cursor-pointer" :name="item.name" :img="item.sprites.front_default" :types="item.types" :favorite="item.favorite" @click="getDetailPokemon(item)" />
      </div>
      <div v-else class="mx-auto w-2/3 flex items-center justify-between gap-y-10 flex-wrap">
        <SkeletonCards v-for="item in 21" :key="item" class="animate-pulse" />
      </div>
    </div>
  </div>
  <PokemonDetail :open="open" :detail="detail" @close="close($event)" />
</template>
