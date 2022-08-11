import {createApp} from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import store from './store/index'
import {createRouter, createWebHistory} from "vue-router"
import {Quasar} from 'quasar'
import quasarUserOptions from './quasar-user-options'

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

createApp(App)
    .use(Quasar, quasarUserOptions)
    .use(route)
    .use(store)
    .use(VueAxios, axios)
    .mount('#app');
