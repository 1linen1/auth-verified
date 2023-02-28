import axios from '../utils/request.js'

export function login(data) {
  return axios({
    url: "/user/login",
    method: 'POST',
    data,
  })
}

export function logout() {
  return axios({
    url: "/user/logout",
    method: 'GET'
  })
}

export function getMenuResource() {
  return axios({
    url: "/menu/resources",
    method: 'GET',
  })
}


