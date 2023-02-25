import axios from "axios"
import { getToken } from "./auth.js"

const service = axios.create({
  baseURL: 'http://127.0.0.1:20002/'
})

// 请求拦截器
service.interceptors.request.use(config => {
  config.headers['token'] = getToken()
  return config
})

// 响应拦截器
service.interceptors.response.use(res => {
  return res
}, error => {
  return Promise.reject(error)
})

export default service