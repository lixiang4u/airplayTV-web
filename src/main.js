import {createApp} from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import store from './store/index'
import {createRouter, createWebHistory} from "vue-router"
import {Quasar} from 'quasar'
import quasarUserOptions from './quasar-user-options'

axios.defaults.baseURL = 'https://tv.artools.cc';
axios.interceptors.request.use(config => {
    // console.log('[interceptors.config]', config);

    // 需要检查调用方有没有传params
    if (config.params === undefined) {
        config.params = [];
    }
    config.params['_source'] = (localStorage['video_source'] || '');
    return config;
}, error => {
    // console.log('[interceptors.error]', error);
    return Promise.reject(error);
});

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
            path: '/fullscreen',
            name: 'fullscreen',
            component: () => import('./views/fullscreen')
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

// 鸡肋的路由跳转方式....
route.beforeEach((to, from, next) => {
    let whiteListPath = ['/qr'];
    if (to.path in whiteListPath) {
        next();
    }
    let isJumpTv = store.state.isJumpTv;
    if (isJumpTv === true || isJumpTv === false) {
        next();
    }
    axios.get('/api/env/predict', {params: {t: new Date().getUTCSeconds()}}).then((response) => {
        let b = (response.data['is_tv'] || false);
        store.commit('setJumpTv', b);
        if (b) {
            next({path: '/qr', query: {from: 'tv-redirect'}});
        } else {
            next();
        }
    });
});

createApp(App)
    .use(Quasar, quasarUserOptions)
    .use(route)
    .use(store)
    .use(VueAxios, axios)
    .mount('#app');
