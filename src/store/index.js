import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

// 配置项默认是vuex
export default new Vuex.Store({
  plugins: [
    createPersistedstate({
      key: 'HEIMA_TOUTIAO',
      storage: Window.sessionStorage,
      reducer({ tokenObj, MyChannels }) {
        return { tokenObj, MyChannels }
      }
    })
  ],
  state: {
    tokenObj: {},
    MyChannels: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    },

    /**
     * @param {Array} channels 删除或添加后最新的数组
     */
    SET_MY_CHANNELS(state, channels) {
      state.MyChannels = channels
    }
  }
})
