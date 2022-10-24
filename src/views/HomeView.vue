<script setup>
import axios from 'axios'
import { inject, onMounted, ref } from 'vue'
import Searchbar from '../components/searchBar.vue'
import PokemonCard from '../components/pokemonCards.vue'
const $pokeDex = inject('$pokeDex')
const pokemonList = ref([])
onMounted(async () => {
  const fetched = await axios.get(`${$pokeDex}pokemon?limit=21`)
  if (fetched.status === 200)
    pokemonList.value = fetched.data.results
})
</script>

<template>
  <div class="container pt-10 mx-auto">
    <div class="mx-auto max-w-7xl">
      <Searchbar />
    </div>

    <div class="mt-6 flex max-w-7xl mx-auto">
      <div class="w-2/3 flex items-center justify-between gap-y-10 flex-wrap">
        <!-- <h1>123</h1> -->
        <PokemonCard v-for="item in pokemonList" :key="item.idx" />
      </div>
    </div>
  </div>
</template>
