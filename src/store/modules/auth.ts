import { createNamespacedHelpers } from 'vuex'
import {
  DefineGetters, DefineMutations, DefineActions,
} from 'vuex-type-helper'

import qs from 'qs'
import api from '../../api/imgur'
import router from '../../router'

// ** STATE **
export type AuthToken = string | null

export interface AuthState {
  token: AuthToken
}

const authState: AuthState = {
  token: window.localStorage.getItem('imgur_token'),
}

// ** GETTERS **
export interface AuthGetters {
  // getterName: returnType
  isLoggedIn: boolean
}

const getters: DefineGetters<AuthGetters, AuthState> = {
  isLoggedIn: (state: AuthState) => !!state.token,
}

// ** MUTATIONS **
export interface AuthMutations {
  // mutationName: mutationPayloadType
  setToken: AuthToken
}

const mutations: DefineMutations<AuthMutations, AuthState> = {
  setToken: (state: AuthState, token) => state.token = token,
}

// ** ACTIONS **
export interface AuthActions {
  // actionName: actionPayloadType
  login: undefined
  finalizeLogin: string
  logout: undefined
}

const actions: DefineActions<AuthActions, AuthState, AuthMutations, AuthGetters> = {
  login: () => {
    api.login()
  },
  finalizeLogin: ({ commit }, hash: string) => {
    const query = qs.parse(hash.replace('#', ''))

    commit('setToken', query.access_token)
    window.localStorage.setItem('imgur_token', query.access_token)
    router.push('/')
  },
  logout: ({ commit }) => {
    commit('setToken', null)
    window.localStorage.removeItem('imgur_token')
  },
}


const auth = {
  namespaced: true,
  state: authState,
  getters,
  actions,
  mutations,
}

export default auth

// ** HELPERS **

export const authHelpers = createNamespacedHelpers<AuthState, AuthGetters, AuthMutations, AuthActions>('auth')
