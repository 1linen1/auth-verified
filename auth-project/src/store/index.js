// import {defineStore} from "pinia"
import {ref} from "vue"
import {defineStore} from "pinia"

// 使用了组合式API的写法
export const useMenuStore = defineStore('navStore', () => {
  let homeRoute = ref([])

  function setHomeRoute(homeRoute) {
    this.homeRoute = homeRoute
  }

  return {
    homeRoute,
    setHomeRoute
  }
})