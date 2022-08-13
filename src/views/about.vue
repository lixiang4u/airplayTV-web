<template>
    <div class="main">
        <div class="text-center flex-center">

            <p>数据采集自网络</p>
            <p>本站不存储任何视频相关数据</p>
            <p>原视频网站对非国内ip请求做了限制，导致部分视频可能无法观看</p>
            <p>
                使用
                <router-link to="/fullscreen">[TΞSLA 全屏]</router-link>
                可通过腾讯视频->爆米花->打开本站的全屏模式
            </p>
            <p>^^</p>
            <p></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AboutComponent',
        mounted() {
            console.log('[About.getClientId]', this.$store.state.clientId);
        }
    }
</script>

<style scoped>
    .main {
        margin-top: 80px;
    }
</style>