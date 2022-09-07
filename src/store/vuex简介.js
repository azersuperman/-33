import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// vuex声明变量
// 声明：在state里
// 取：$store.state.属性名

// vuex修改数据
// 自产自销
// 规范：函数命名采用大驼峰
// mutations：函数
// mutations里的函数的参数
// state：数据

// 触发mutations里面的方法
// this.$store.commit('mutations方法名字)
export default new Vuex.Store({
  state: { action: 0 },
  getters: {
    bigNum(state) {
      return state.action * 10
    }
  },
  mutations: {
    GET_ACTION(state, payload) {
      state.action += payload
    }
  }
})
