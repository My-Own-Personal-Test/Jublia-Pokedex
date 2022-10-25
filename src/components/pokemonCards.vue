<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  types: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="shadow-sm rounded-lg border border-solid border-gray-200 p-5 w-[270px]">
    <img :src="img" alt="" class="mx-auto">
    <p class="text-slate-600 font-semibold capitalize text-center">
      {{ name }}
    </p>
    <div class="flex justify-center gap-2 mt-4">
      <p v-for="items in types" :key="items.idx" class="capitalize border border-solid rounded-md px-2 border-slate-300 text-slate-600">
        {{ items.type.name }}
      </p>
    </div>
    <div class="flex justify-center  mt-4">
      <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256l4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73l3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356l-.83 4.73zm4.905-2.767l-3.686 1.894l.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575l-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957l-3.686-1.894a.503.503 0 0 0-.461 0z" /></svg>
    </div>
  </div>
</template>
