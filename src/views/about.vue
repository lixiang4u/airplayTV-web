<template>
    <div class="main">
        <div class="text-center flex-center">

            <p>数据采集自网络</p>
            <p>原视频地址部分存在请求ip验证，非国内不能访问</p>
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
    .main{
        margin-top: 80px;
    }
</style>