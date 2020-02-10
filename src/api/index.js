// 导出一个配置好的axios提供给main.js使用
import axios from 'axios'
import auth from '@/utils/auth'

// 配置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 配置 请求头token
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`

// 配置请求拦截器
axios.interceptors.request.use(config => {
    // 获取本地的token，如果有token 就追加
    const user = auth.getUser()
    if (user.token) config.headers.Authorization = `Bearer ${user.token}`
    return config
}, error => {
    return Promise.reject(error)
})


// 导出axios
export default axios