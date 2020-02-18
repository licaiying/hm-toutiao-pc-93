import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'

// 导入Login
import Login from '@/views/login'

// 导入工具auth(操作token的相关函数)
import auth from '@/utils/auth'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/login', component: Login },
        {
            path: '/',
            component: Home,
            children: [
                { path: '/', component: Welcome },
                { path: '/article', component: Article },
                { path: '/image', component: Image },
                { path: '/publish', component: Publish },
                { path: '/comment', component: Comment }
            ]
        },
        // 通配规则(以上所有的规则不符合的时候，走下面这个规则)
        { path: '*', component: NotFound }
    ]
});

// 设置前置导航守卫
router.beforeEach((to, from, next) => {
    // 如果你不是登录页面，而且你没有token，拦截到登录页面
    if (to.path !== '/login' && !auth.getUser().token) return next('/login')
    // 其他情况放行
    next()
})

export default router