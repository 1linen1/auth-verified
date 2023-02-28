<template>
  <div class="common-layout">
    <el-container>
      <Aside></Aside>
      <el-container>
        <el-header class="header">
          <el-button class="logout" type="primary" plain @click="quit">退出</el-button>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
  import Aside from "./components/Aside.vue"
  import {logout} from "../../api/api.js"
  import {useRouter} from "vue-router"

  const router = useRouter()

  async function quit() {
    let response = await logout()
    if (response.data.code === 1) {
      ElMessage.success(response.data.msg)
      router.push('/login')
    }
  }
</script>

<style lang="less" scoped>
  .header {
    position: relative;
    .logout {
      position: absolute;
      right: 1vw;
      top: 4vh;
      width: 80px;
      font-size: 15px;
    }
  }
</style>