// import {defineStore} from "pinia"
import {ref} from "vue"
import {defineStore} from "pinia"

// 使用了组合式API的写法
export const useMenuStore = defineStore('navStore', () => {
  let menuList = ref([])

  function setMenuList(menuList) {
    this.menuList = menuList
  }

  function clearMenuList() {
    this.menuList = []
  }

  return {
    menuList,
    setMenuList,
    clearMenuList,
  }
})