<template>
  <div>
    <div class="image-container" v-if="isLoggedIn">
      <img v-for="image in allImages" :src="image.link" :key="image.id" />
    </div>
    <h2 v-else>Log in to get started!</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authHelpers } from '@/store/modules/auth'
import { imagesHelpers } from '@/store/modules/images'

export default Vue.extend({
  name: 'ImageList',
  computed: {
    ...authHelpers.mapGetters(['isLoggedIn']),
    ...imagesHelpers.mapGetters(['allImages']),
  },
  methods: imagesHelpers.mapActions(['fetchImages']),
  created() {
    this.fetchImages(undefined)
  },
})
</script>

<style scoped>

.image-container {
  column-count: 3;
  column-gap: 0;
}

img {
  max-width: 100%;
  padding: 5px;
}

</style>
