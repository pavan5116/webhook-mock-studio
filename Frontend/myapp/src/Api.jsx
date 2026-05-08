import axios from "axios"

// Read the backend base URL from .env (Vite exposes VITE_* vars to the client).
// Falls back to localhost so the app still runs if the env var is missing.
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000"

const API = axios.create({
  baseURL: API_BASE,
  withCredentials: true
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve()
    }
  })
  failedQueue = []
}

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh/")
    ) {
      
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
        .then(() => {
          return API(originalRequest)
        })
        .catch(err => {
          return Promise.reject(err)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await API.post("/refresh/")
        
        processQueue(null)
        
        return API(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        window.location.href = "/login"
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default API