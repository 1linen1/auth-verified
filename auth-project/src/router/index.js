import { createRouter, createWebHashHistory } from 'vue-router'
import {useMenuStore} from "../store/index.js"
import {getMenuResource} from "../api/api.js"


const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    // // 路由独享守卫
    // beforeEnter: [getMenuInfo],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

/*
* 将得到的路由信息转换成路由的格式
*  */
function changeFormat(menuResource) {
  // 找到需要添加子路由的父路由
  let homeRoute = routes.filter(v => "/home" === v.path)[0]
  homeRoute.children = []

  menuResource.forEach(item => {
    homeRoute.children.push({
      path: item.path,
      name: item.component,
      component: () => import(`../views/home/views/${item.path}/index.vue`)
    })
  })

  return homeRoute
}

router.beforeEach(async (to, from, next) => {
  const menuStore = useMenuStore()
  let menuList = menuStore.menuList
  if (menuList.length <= 0 && "/login" !== to.path) {
    // 获取原始菜单数据
    const response = await getMenuResource()

    // 保存到 Pinia中
    menuStore.setMenuList(response.data.data)

    // 封装成路由数据
    let homeRoute = changeFormat(response.data.data)

    await router.addRoute(homeRoute)
    // console.log(to.path)
    next({path: to.path})
  } else {
    next()
  }
})

export default router