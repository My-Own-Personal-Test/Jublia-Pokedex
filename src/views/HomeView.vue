<script setup>
import axios from 'axios'
import { inject, onMounted, ref } from 'vue'
import Searchbar from '../components/searchBar.vue'
const $pokeDex = inject('$pokeDex')
onMounted(async () => {
  await axios.get(`${$pokeDex}pokemon`)
})
</script>

<template>
  <div class="container pt-10">
    <div class="mx-auto max-w-7xl">
      <Searchbar />
    </div>
  </div>
</template>
