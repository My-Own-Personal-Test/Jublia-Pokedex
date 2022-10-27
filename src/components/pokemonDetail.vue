<script setup>
import { ref, watch } from 'vue'
import useAxios from '../../axios.config'
import useFavorite from '../composables/favorite'

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
const image = ref('')
const abilitiesDetail = ref([])
const speciesDetails = ref({})
const loading = ref(true)
const { saveFavorite } = useFavorite()
const { axiosInstance } = useAxios()

// this function is called to get the pokemon species details right after abilities is fetched
const getSpecies = async () => {
  const species = await axiosInstance.get(prop.detail.species.url)
  speciesDetails.value = species.data
  loading.value = false
}

// this function is called when the value of the prop detail is changed to get new values of the pokemon's abilities
const getAbilities = async () => {
  // this coding block will run if the props detail of abilities is not empty and it will run and loops for all the pokemon's abilities and fetch all the abilities details
  if (prop.detail.abilities.length) {
    const arr = prop.detail.abilities
    abilitiesDetail.value = []
    for (let i = 0; i < arr.length; i++) {
      const abilities = await axiosInstance.get(arr[i].ability.url)
      abilitiesDetail.value.push(abilities.data)
    }
    getSpecies()
  }
}

watch(prop, (val) => {
  image.value = val.detail.sprites.front_default
  opener.value = val.open
  getAbilities()
})
</script>

<template>
  <input v-model="opener" type="checkbox" class="modal-toggle">
  <div class="modal">
    <div class="modal-box bg-slate-100 relative">
      <label class="btn btn-sm btn-circle absolute right-2 top-2 bg-slate-300 hover:bg-slate-200 border-none text-slate-600 " @click="$emit('close', { asFave: false })">✕</label>
      <div v-if="!loading" class="text-center">
        <div>
          <img class="mx-auto" :src="image" height="100" alt="">
        </div>
        <div class="mb-2">
          <h1 class="text-slate-600 capitalize font-bold text-2xl">
            {{ prop.detail.name }}
          </h1>
        </div>
        <div class="mb-2">
          <p>
            #{{ prop.detail.id }}
          </p>
        </div>
        <div class="flex justify-center items-center gap-x-4 mb-2">
          <div v-for="item in prop.detail.types" :key="item.type.name" class="bg-slate-200 text-slate-600 rounded-md px-2 py-1 capitalize">
            {{ item.type.name }}
          </div>
        </div>
        <div class="mb-2">
          <p class="text-slate-600 font-bold text-left">
            Egg groups :
          </p>
          <div v-for="egg in speciesDetails.egg_groups" :key="egg.id" class="text-black capitalize max-w-fit my-1 py-2 text-sm px-4 rounded-full bg-orange-300">
            <p>{{ egg.name }}</p>
          </div>
        </div>
        <div class="text-left flex flex-col gap-y-4">
          <div v-for="item in abilitiesDetail" :key="item.idx">
            <h1 class="text-slate-600 font-bold capitalize">
              {{ item.name }}
            </h1>
            <p v-for="datas in item.effect_entries" :key="datas.i" class="text-slate-500 text-sm text-justify">
              {{ datas.effect }}
            </p>
          </div>
        </div>
        <div>
          <button class="py-1 px-2 bg-slate-300 rounded-lg mt-4 w-full text-slate-600 hover:bg-slate-200" @click="saveFavorite(prop.detail.id), $emit('close', { asFave: true })">
            {{ prop.detail.favorite ? 'Remove from favorite' : 'Add to favorite' }}
          </button>
        </div>
      </div>
      <div v-else>
        <p class="text-slate-600">
          Getting pokemon datas...
        </p>
      </div>
    </div>
  </div>
</template>
