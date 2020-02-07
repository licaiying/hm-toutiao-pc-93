import Vue from 'vue'
import App from './App.vue'

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入路由
import router from './router/index.js'

// 导入axios
import axios from 'axios'
// 挂载 $http 对象就是axios
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
