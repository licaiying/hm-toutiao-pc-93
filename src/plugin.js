// 基于vue的插件
// 将自己封装的面包屑组件导入进来
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'

// 定义一个全局的vue插件
export default {
    // 将来在main.js中使用，使用方式是：Vue.use(当前插件)  
    // 传入Vue参数
    install(Vue) {
        // 使用Vue对象扩展功能
        Vue.component(MyBread.name, MyBread)
        Vue.component(MyChannel.name, MyChannel)
        Vue.component(MyImage.name, MyImage)
    }
}