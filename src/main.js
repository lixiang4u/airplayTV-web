import {createApp} from 'vue'
import App from './App.vue'
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
    ]
});

createApp(App).use(route).mount('#app');
