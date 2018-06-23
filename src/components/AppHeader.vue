<template>
  <div class="ui secondary pointing menu">
    <router-link class="active item" to="/">
      Image Storage
    </router-link>
    <div class="right menu">
      <div v-if="isLoggedIn" class="horizontal">
        <router-link to="/" class="item">Galleries</router-link>
        <router-link to="/upload" class="item">Upload</router-link>
        <a class="item" @click="logout">Logout</a>
      </div>
      <a v-else href="#" class="ui item" @click="login">Login</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authHelpers } from '@/store/modules/auth'

export default Vue.extend({
  name: 'AppHeader',
  computed: authHelpers.mapGetters(['isLoggedIn']),
  methods: authHelpers.mapActions(['login', 'logout']),
})
</script>

<style scoped>
.horizontal {
  display: flex;
  flex-direction: row;
}
</style>
