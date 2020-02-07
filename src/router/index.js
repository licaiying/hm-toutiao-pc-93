import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入Login
import Login from '@/views/login'

// 导入Home
import Home from '@/views/home'

// 导入Welcome
import Welcome from '@/views/welcome'

// 导入404
import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/login', component: Login },
        {
            path: '/',
            component: Home,
            children: [
                { path: '/', component: Welcome }
            ]
        },
        // 通配规则(以上所有的规则不符合的时候，走下面这个规则)
        { path: '*', component: NotFound }
    ]
});

export default router