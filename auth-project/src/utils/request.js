import axios from "axios"

const service = axios.create({
  baseURL: 'http://localhost:8888/'
})

// 请求拦截器
service.interceptors.request.use(config => {
  return config
})

// 响应拦截器
service.interceptors.response.use(res => {
  return res
}, error => {
  return Promise.reject(error)
})

export default service