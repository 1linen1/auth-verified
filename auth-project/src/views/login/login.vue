<template>
  <el-form ref="ruleFormRef"
           :model="form"
           :rules="rules"
           label-width="120px"
           class="demo-ruleForm">
    <el-form-item label="账户：" prop="account" >
      <el-input class="account" v-model="form.account"/>
    </el-form-item>
    <el-form-item label="密码：" prop="password">
      <el-input class="password" type="password" v-model="form.password" show-password />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        登录
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">清除</el-button>
    </el-form-item>

  </el-form>
</template>

<script setup>
  import {ref} from "vue"
  import {useRouter} from 'vue-router'

  const ruleFormRef = ref()
  const router = useRouter()

  const form = ref({
    account: '',
    password: '',
  })
  const rules = ref({
    account: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 16, message: '长度必须在3-16位之间', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 8, max: 16, message: '密码必须在8-16位之间', trigger: 'blur' },
    ],
  })

  const submitForm = async (formEl) => {
    if (!formEl) return
    // 校验
    await formEl.validate((valid, fields) => {
      if (valid) {
        router.push('/home')
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

</style>