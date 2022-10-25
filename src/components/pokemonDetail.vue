<script setup>
import { ref, watch } from 'vue'

const prop = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  detail: {
    type: Object,
    default: () => {},
  },
})
defineEmits(['close'])
const opener = ref(false)

watch(prop, (val) => {
  opener.value = val.open
})
</script>

<template>
  <input v-model="opener" type="checkbox" class="modal-toggle">
  <div class="modal">
    <div class="modal-box bg-slate-100">
      <h1>{{ detail.name }}</h1>
      <div class="modal-action">
        <label class="btn" @click="$emit('close')">Yay!</label>
      </div>
    </div>
  </div>
</template>
