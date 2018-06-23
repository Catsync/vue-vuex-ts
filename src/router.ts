import Vue from 'vue'
import Router from 'vue-router'
import ImageList from './components/ImageList.vue'
import AuthHandler from './components/AuthHandler.vue'
import UploadForm from './components/UploadForm.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: ImageList },
    { path: '/oauth2/callback', component: AuthHandler },
    { path: '/upload', component: UploadForm },
  ],
})
