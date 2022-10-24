<script setup>
import axios from 'axios'
import { defineComponent, inject, onMounted, ref } from 'vue'
import Searchbar from '../components/searchBar.vue'
import PokemonCard from '../components/pokemonCards.vue'
import SkeletonCards from '../components/skeletonsCard.vue'
defineComponent({
  components: {
    Searchbar,
    PokemonCard,
    SkeletonCards,
  },
})
const $pokeDex = inject('$pokeDex')
const loading = ref(true)
const pokemonList = ref([])
onMounted(async () => {
  const fetched = await axios.get(`${$pokeDex}pokemon?limit=21`)
  if (fetched.status === 200) {
    const arr = fetched.data.results
    for (let i = 0; i < arr.length; i++) {
      const perPokemon = await axios.get(arr[i].url)
      pokemonList.value.push(perPokemon.data)
      loading.value = false
    }
  }
})
</script>

<template>
  <div class="container pt-10 mx-auto">
    <div class="mx-auto max-w-7xl">
      <Searchbar />
    </div>

    <div class="mt-6 flex max-w-7xl mx-auto">
      <div v-if="!loading" class="w-2/3 flex items-center justify-between gap-y-10 flex-wrap">
        <PokemonCard v-for="item in pokemonList" :key="item.idx" :name="item.name" :img="item.sprites.front_default" :types="item.types" />
      </div>
      <div v-else class="w-2/3 flex items-center justify-between gap-y-10 flex-wrap">
        <SkeletonCards v-for="item in 21" :key="item" class="animate-pulse" />
      </div>
    </div>
  </div>
</template>
