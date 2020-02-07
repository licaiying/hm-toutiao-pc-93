import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入Login
import Login from '@/views/login'

// 导入Home
import Home from '@/views/home'

// 导入Welcome
import Welcome from '@/views/welcome'

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
        }
    ]
});

export default router