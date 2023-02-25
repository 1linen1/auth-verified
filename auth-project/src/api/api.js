import axios from '../utils/request.js'

export function login(data) {
  return axios({
    url: "/user/login",
    method: 'POST',
    data,
  })
}

export function getMenuResource() {
  return axios({
    url: "/menu/resources",
    method: 'GET',
  })
}


