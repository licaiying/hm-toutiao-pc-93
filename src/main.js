import Vue from 'vue'
import App from './App.vue'

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入对话框的样式
// 自己的样式，注意写在饿了么样式下方，才能覆盖样式
// 引入之后，作用与每个组件，全局样式
import '@/styles/index.less'

// 导入路由
import router from './router/index.js'

// 导入自己配置的axios
import axios from '@/api'

// 导入自己封装的插件  src/plugin.js
import Plugin from '@/plugin'
Vue.use(Plugin)

// 挂载 $http 对象就是axios
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
