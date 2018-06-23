import { createNamespacedHelpers } from 'vuex'
import {
  DefineGetters, DefineMutations, DefineActions,
} from 'vuex-type-helper'

import api from '../../api/imgur'
import router from '../../router'


// ** STATE **
export type Image = any

export interface ImagesState {
  images: Image[]
}

const imagesState: ImagesState = {
  images: [],
}

// ** GETTERS **
export interface ImagesGetters {
  allImages: Image[]
}
const getters: DefineGetters<ImagesGetters, ImagesState> = {
  allImages: (state) => state.images,
}

// ** MUTATTIONS **
export interface ImagesMutations {
  setImages: Image[]
}
const mutations: DefineMutations<ImagesMutations, ImagesState> = {
  setImages: (state, images) => {
    state.images = images
  },
}

// ** ACTIONS **
export interface ImagesActions {
  fetchImages: undefined
  uploadImages: Image[]
}

const actions: DefineActions<ImagesActions, ImagesState, ImagesMutations, ImagesGetters> = {
  async fetchImages({ commit, rootState }) {
    const { token } = rootState.auth
    if (token) {
      const response = await api.fetchImages(token)
      commit('setImages', response.data.data)
    }
  },
  async uploadImages({ rootState }, images: Image[]) {
    const { token } = rootState.auth
    if (token) {
      await api.uploadImages(images, token)
    }
    router.push('/')
  },
}


const imagesModule = {
  namespaced: true,
  state: imagesState,
  getters,
  actions,
  mutations,
}

export default imagesModule

// ** HELPERS **

export const imagesHelpers =
  createNamespacedHelpers<ImagesState, ImagesGetters, ImagesMutations, ImagesActions>('images')
