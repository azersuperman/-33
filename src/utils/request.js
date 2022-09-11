// 下载axios
// 引入axios
// 配置axios
import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 3000

// const request = axios.create() 克隆axios
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

request.interceptors.request.use(
  function (config) {
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config
  },
  function (error) {
    return error
  }
)
export default request
