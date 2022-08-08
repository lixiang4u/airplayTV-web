import {createApp} from 'vue'
import App from './App.vue'
import store from './store/index'
import {createRouter, createWebHistory} from "vue-router"

const route = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            name: '/home',
            component: () => import('./views/home.vue')
        },
        {
            path: '/about',
            name: '/about',
            component: () => import('./views/about.vue')
        },
        {
            path: '/qr-index',
            name: '/qr-index',
            component: () => import('./views/qr-index.vue')
        },
        {
            path: '/video/list',
            name: '/video/list',
            component: () => import('./views/video/list')
        },
    ]
});

createApp(App).use(route).use(store).mount('#app');
