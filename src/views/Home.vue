<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-avatar :src="avatar"></el-avatar>
    <el-button @click="logout">退出登录</el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  computed: {
    avatar () {
      return this.$store.state.user.avatar
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
