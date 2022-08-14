<template>
    <div class="main">
        <div class="text-center flex-center">

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
            <pre>navigator: {{ navigator }}</pre>
            <pre>location: {{ location }}</pre>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AboutComponent',
        mounted() {
            console.log('[About.getClientId]', this.$store.state.clientId);
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