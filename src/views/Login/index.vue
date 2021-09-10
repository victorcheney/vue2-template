<!--
 * @Description: 登录
 * @Author: chenfengtao
 * @Date: 2021-06-30 15:56:36
 * @LastEditors: chenfengtao
 * @LastEditTime: 2021-09-09 16:44:34
-->
<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-suffix="：" label-position="right" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="大写锁定" placement="right" manual>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            @blur="caspTooltip = false"
            @keyup.native="checkCapsTooltip"
          ></el-input>
        </el-form-item>
      </el-tooltip>
      <el-button :loading="loading" type="primary" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { isValidUsername, isValidPassword } from '@/utils/validate'

export default {
  name: 'Login',
  props: {},
  components: {},
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isValidUsername(value)) {
        callback(new Error('用户名包含数字、字母、下划线，数字字母必须同时存在'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (!isValidPassword(value)) {
        callback(new Error('包含字母数字下划线，字母开头长度6-18位'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: 'admin0',
        password: 'a123456'
      },
      loginRules: {
        username: [{ required: true, triger: 'blur', validator: validateUsername }],
        password: [{ required: true, triger: 'blur', validator: validatePassword }]
      },
      capsTooltip: true,
      redirect: undefined,
      loading: false
    }
  },
  computed: {},
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        this.redirect = query.redirect
      },
      immediate: true
    }
  },
  created () {},
  mounted () {

  },
  methods: {
    checkCapsTooltip (e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.replace({ path: this.redirect || '/' })
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  },
  beforeDestroy () {

  }
}
</script>

<style scoped>
.login {
  margin: 50px auto;
  height: 100%;
  width: 500px;
}
</style>
