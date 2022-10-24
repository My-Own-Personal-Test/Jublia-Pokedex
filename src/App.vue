<script setup>
import { RouterView } from 'vue-router'
import NavbarComponents from './components/NavbarComponents.vue'
</script>

<template>
  <div class="container mx-auto">
    <NavbarComponents />
    <RouterView />
  </div>
</template>
