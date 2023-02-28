<template>
  <div class="container">
    <el-form ref="ruleFormRef"
             :model="form"
             :rules="rules"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="账户：" prop="account" >
        <el-input class="account" v-model="form.account"/>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input class="password" type="password" v-model="form.password" show-password />
      </el-form-item>

      <el-form-item class="bottom">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">清除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import {ref} from "vue"
  import {useRouter} from 'vue-router'
  import {login} from '../../api/api.js'
  import {setToken} from "../../utils/auth.js"

  const ruleFormRef = ref()
  const router = useRouter()

  const form = ref({
    account: 'admin',
    password: 'admin',
  })
  const rules = ref({
    account: [
      { required: true, message: '请输入用户名', trigger: 'blur'},
      { min: 3, max: 16, message: '长度必须在3-16位之间', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 3, max: 16, message: '密码必须在3-16位之间', trigger: 'blur' },
    ],
  })


  const submitForm = async (formEl) => {
    if (!formEl) return
    // 校验
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        let response = await login({username: form.value.account, password: form.value.password})
        console.log(response)
        if (response.data.code === 1) {
          setToken(response.data.data.token)
          router.push('/home/index')
        } else {
          ElMessage(response.data.msg)
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
  }


</script>

<style lang="less" scoped>
  .container {
    position: relative;
    margin: 45vh auto;

    width: 350px;

    .tip {
      position: absolute;
      width: 100%;
      text-align: center;
      top: -5vh;
    }

    .bottom {
      display: flex;
      flex-direction: row;
      padding-left: 5vh;
    }
  }
</style>