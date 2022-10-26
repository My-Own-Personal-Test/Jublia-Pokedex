import { ref } from 'vue'

const useFavorite = () => {
  const favorite = ref([])

  const saveFavorite = (data) => {
    const isExist = favorite.value.find(item => item === data)
    if (!isExist)
      favorite.value.push(data)

    localStorage.setItem('favorite', JSON.stringify(favorite.value))
  }

  const getFavorite = () => {
    const data = localStorage.getItem('favorite')
    if (data)
      favorite.value = JSON.parse(data)
  }

  return { favorite, saveFavorite, getFavorite }
}

export default useFavorite
