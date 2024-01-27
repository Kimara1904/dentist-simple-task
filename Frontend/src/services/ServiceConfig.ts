import axios from 'axios'

export const baseUrl = import.meta.env.VITE_API_URL as string

export const configureAxiosRequestInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
