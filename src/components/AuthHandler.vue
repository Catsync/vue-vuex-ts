<template>
  <div>Please wait... logging you in.</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authHelpers } from '@/store/modules/auth'

export default Vue.extend({
  name: 'AuthHandler',
  methods: authHelpers.mapActions(['finalizeLogin']),
  created() {
    this.finalizeLogin(window.location.hash)
  },
})
</script>
