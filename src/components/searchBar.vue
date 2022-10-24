<script setup>
import { inject, ref } from 'vue'
import axios from 'axios'
const pokemonName = ref('')
const $pokeDex = inject('$pokeDex')

const searchPokemon = async () => {
  try {
    const pokemon = await axios.get(`${$pokeDex}pokemon/${pokemonName.value}`)
    console.log(pokemon)
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="mx-auto">
    <form @submit.prevent="searchPokemon">
      <input v-model="pokemonName" class="py-4 rounded-md w-2/3 shadow-sm px-6 focus:outline-none focus:ring-1 focus:ring-sky-400" placeholder="Search pokemon by name" type="text">
    </form>
  </div>
</template>
