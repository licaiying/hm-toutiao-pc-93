// 导出一个配置好的axios提供给main.js使用
import axios from 'axios'
import auth from '@/utils/auth'
import router from '@/router'
import JsonBigint from 'json-bigint'

// 配置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 配置 请求头token
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`

//  使用json-bigint转换数据的响应格式
axios.defaults.transformResponse = [data => {
    // 因为进行格式转换的时候，data有可能不是json格式(极端情况),return JsonBigint.parse(data) 可能会报错
    // 所以，得使用try{}catch(e){} 捕捉错误信息
    try {
        // 正常转换
        return JsonBigint.parse(data)
    } catch (e) {
        // 转换异常，还是使用原始数据
        return data
    }
}]

// 配置请求拦截器
axios.interceptors.request.use(config => {
    // 获取本地的token，如果有token 就追加
    const user = auth.getUser()
    if (user.token) config.headers.Authorization = `Bearer ${user.token}`
    return config
}, error => {
    return Promise.reject(error)
})

// 配置响应拦截器
axios.interceptors.response.use(res => {
    // 此时，不对响应的正确结果做处理
    return res
}, err => {
    // err.response 是响应报文对象
    // err.response.status 是响应的错误的状态码
    if (err.response && err.response.status === 401) {
        // 拦截到登录页面
        router.push('/login')
    }
    return Promise.reject(err)
})


// 导出axios
export default axios