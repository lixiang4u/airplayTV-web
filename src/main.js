import {createApp} from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import store from './store/index'
import {createRouter, createWebHistory} from "vue-router"
import {Quasar} from 'quasar'
import quasarUserOptions from './quasar-user-options'

axios.defaults.baseURL = 'https://tv.artools.cc';

const route = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./views/video/list')
        },
        {
            path: '/home',
            component: () => import('./views/home.vue')
        },
        {
            path: '/about',
            component: () => import('./views/about.vue')
        },
        {
            path: '/qr',
            component: () => import('./views/qr-index.vue')
        },
        {
            path: '/video/list',
            name: 'video-list',
            component: () => import('./views/video/list')
        },
        {
            path: '/video/tag/:tag',
            name: 'video-tag-list',
            component: () => import('./views/video/list')
        },
        {
            path: '/video/:id',
            name: 'video-detail',
            component: () => import('./views/video/detail')
        },
        {
            path: '/video/play/:id',
            name: 'video-play',
            component: () => import('./views/video/play')
        },
    ]
});

createApp(App)
    .use(Quasar, quasarUserOptions)
    .use(route)
    .use(store)
    .use(VueAxios, axios)
    .mount('#app');
