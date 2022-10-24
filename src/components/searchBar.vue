<script setup>
import { ref } from 'vue'
const pokemonName = ref('')
</script>

<template>
  <div class="mx-auto">
    <form @submit.prevent="searchPokemon">
      <input v-model="pokemonName" class="py-4 rounded-md w-2/3 shadow-sm px-6 focus:outline-none focus:ring-1 focus:ring-sky-400" placeholder="Search pokemon" type="text">
    </form>
  </div>
</template>
