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
  favorite: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="shadow-sm rounded-lg border border-solid border-gray-200 p-5 w-[270px]">
    <img :src="img" alt="" class="mx-auto">
    <p class="text-slate-600 font-semibold capitalize text-center">
      {{ props.name }}
    </p>
    <div class="flex justify-center gap-2 mt-4">
      <p v-for="items in types" :key="items.idx" class="capitalize border border-solid rounded-md px-2 border-slate-300 text-slate-600">
        {{ items.type.name }}
      </p>
    </div>
    <div class="flex justify-center  mt-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="m10 1l3 6l6 .75l-4.12 4.62L16 19l-6-3l-6 3l1.13-6.63L1 7.75L7 7z" :class="{ 'text-yellow-500': props.favorite }" /></svg>
    </div>
  </div>
</template>
