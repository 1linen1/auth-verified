<template>
  <el-aside width="200px" class="aside">
    <el-menu
        active-text-color="#32afd9"
        background-color="#eea"
        default-active="1"
        class="el-menu-vertical-demo"
    >
      <el-menu-item :index="`${item.id}`" v-for="item in menus" :key="item.id" @click="changeViews(item.component)">
        <el-icon><icon-menu /></el-icon>
        <span>{{item.menuName}}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>

</template>

<script setup>
  import {
    Menu as IconMenu,
  } from '@element-plus/icons-vue'
  import {onMounted, ref} from "vue"
  import {getMenuResource} from "../../../api/api.js"
  import {useRouter} from "vue-router"

  const router = useRouter()

  let menus = ref([])

  onMounted(async () => {
    let response = await getMenuResource()
    console.log(response)
    if (response.data.code === 1) {
      menus.value = response.data.data
    }
  })

  function changeViews(name) {
    router.push({
      name,
    })
  }

</script>

<style lang="less" scoped>
  .el-menu-vertical-demo {
    height: 100vh;
    background-color: #32afd9;
  }

  .el-menu-item.is-active {
    background-color: #eea;
  }
</style>