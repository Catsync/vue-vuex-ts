<template>
  <div>
    <AppHeader></AppHeader>
    <div class="ui container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from './components/AppHeader.vue'

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
  },
})
</script>

