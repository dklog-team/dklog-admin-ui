import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        meta: {
            hide: false,
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
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 항상 맨 위로 스크롤
        return { top: 0 }
    },
})

export default router