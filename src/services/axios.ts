import axios from 'axios'

const { VITE_API_URL, VITE_NOT_A_SECRET_TOKEN, VITE_STORE_ID } = import.meta.env

const token = `Bearer ${VITE_NOT_A_SECRET_TOKEN}`
const apiURL = `${VITE_API_URL}/${VITE_STORE_ID}`

axios.interceptors.request.use((config) => {
  config.headers.Authorization = token
  config.url = `${apiURL}${config.url}`
  return config
})

export default axios
