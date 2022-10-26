import axios from 'axios'

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
  })
  return { axiosInstance }
}

export default useAxios
