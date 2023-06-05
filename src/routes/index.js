import { createRouter, createWebHistory } from "vue-router";
import {useCookies} from "vue3-cookies";

const routes = [
    {
        path: '/',
        meta: {
            hide: true,
        },
        component: () => import('./../views/AdminHome.vue'),
    },
    {
        path: '/login',
        meta: {
            hide: false,
        },
        component: () => import('./../views/Login.vue'),
    },
    {
        path: '/post',
        meta: {
            hide: true,
        },
        component: () => import('./../views/PostAdmin.vue'),
    },
    {
        path: '/student',
        meta: {
            hide: true,
        },
        component: () => import('./../views/StudentAdmin.vue'),
    },
    {
        path: '/new/student',
        meta: {
            hide: true,
        },
        component: () => import('./../views/RegisterStudent.vue'),
    },
    {
        path: '/comment',
        meta: {
            hide: true,
        },
        component: () => import('./../views/CommentAdmin.vue'),
    },
    {
        path: '/image',
        meta: {
            hide: true,
        },
        component: () => import('./../views/ImageAdmin.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 항상 맨 위로 스크롤
        return { top: 0 }
    },
})

router.beforeEach((to, from, next) => {
    console.log('before router')
    const cookies = useCookies().cookies
    if (!cookies.get('token')) {
        console.log(to.path)
        if (to.path === '/login') {
            next()
        } else if(to.path === '/') {
            next('/login')
        } else {
            alert('관리자 계정으로 로그인을 해주세요')
            next('/login')
        }
    } else {
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    }
})

export default router
