<template>
    <div class="main">
        <div class="q-mb-lg">
            <p class="text-h4">说明：</p>
            <p>数据采集自网络</p>
            <p>本站不存储任何视频相关数据</p>
            <p>原视频网站对非国内ip请求做了限制，导致部分视频可能无法观看</p>
            <p>
                使用
                <router-link to="/fullscreen">[TΞSLA 全屏]</router-link>
                可通过 <b>腾讯视频</b>-><b>爆米花</b>-><b>本站</b> 多级重定向实现打开本站的全屏模式
            </p>
            <p>全屏模式下<b>可能</b>无法打开虚拟键盘，重新打开尝试即可</p>
            <p>^^</p>
        </div>
        <div class="q-mb-lg">
            <p class="text-h4">播放不了？</p>
            <p>如果源是(CZ)，视频地址是(api.czspp.com)域，则播放不了，需要国内部署服务器才行</p>
            <p>其他播放问题可先尝试刷新，或者换视频源</p>
            <p>-_-</p>
        </div>
        <div class="q-mb-lg">
            <p class="text-h4">调试信息：</p>
            <pre>navigator: {{ navigator }}</pre>
            <pre>location: {{ location }}</pre>
        </div>
        <div class="q-mb-lg">
            <p class="text-h4">选择视频源（默认由后台接口随机分配）：{{ currentVideoSource }}</p>
            <div>
                <q-checkbox size="md" @click="changeSource('cz')" v-model="videoSource.cz"
                            label="源1(cz)（如果效果不行请更换其他源）"/>
            </div>
            <div>
                <q-checkbox size="md" @click="changeSource('nn')" v-model="videoSource.nn"
                            label="源2(nn)（如果效果不行请更换其他源）"/>
            </div>
            <div>
                <q-checkbox size="md" @click="changeSource('my')" v-model="videoSource.my"
                            label="源3(my)（如果效果不行请更换其他源）"/>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'AboutComponent',
        data() {
            return {
                videoSource: {
                    cz: false,
                    nn: false,
                    my: false,
                },
                currentVideoSource: '',
            }
        },
        mounted() {
            console.log('[About.getClientId]', this.$store.state.clientId);

            this.loadVideoSourceToLS();
        },
        methods: {
            changeSource: function (key) {
                this.setVideoSourceToLS(key);

                if (this.videoSource[key] === false) {
                    return false
                }
                for (let k in this.videoSource) {
                    if (k === key) {
                        continue;
                    }
                    this.videoSource[k] = false;
                }
            },
            setVideoSourceToLS: function (sourceKey) {
                localStorage['video_source'] = sourceKey;
                this.currentVideoSource = sourceKey;
            },
            loadVideoSourceToLS: function () {
                let key = localStorage['video_source'];
                for (let k in this.videoSource) {
                    this.videoSource[k] = (k === key);
                }
                this.currentVideoSource = key;
            },
        },
        computed: {
            navigator: function () {
                return {
                    appCodeName: window.navigator.appCodeName,
                    appName: window.navigator.appName,
                    appVersion: window.navigator.appVersion,
                    connection: window.navigator.connection,
                    language: window.navigator.language,
                    languages: window.navigator.languages,
                    platform: window.navigator.platform,
                    product: window.navigator.product,
                    productSub: window.navigator.productSub,
                    userAgent: window.navigator.userAgent,
                    vendor: window.navigator.vendor,
                    vendorSub: window.navigator.vendorSub,
                }
            },
            location: function () {
                return {
                    host: window.location.host,
                    hostname: window.location.hostname,
                    href: window.location.href,
                    origin: window.location.origin,
                    pathname: window.location.pathname,
                    port: window.location.port,
                    protocol: window.location.protocol,
                    search: window.location.search,
                }
            }
        }
    }
</script>

<style scoped>
    .main {
        margin-top: 80px;
    }
</style>