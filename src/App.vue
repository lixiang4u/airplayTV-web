<template>
    <AppFrame/>
</template>

<script>
    import AppFrame from './../src/components/AppFrame';

    export default {
        data() {
            return {}
        },
        components: {
            AppFrame
        },
        mounted() {
            // this.searchText = this.$route.query['q'];
        },
        methods: {}
    }
</script>

<style>
    body {
        background-color: #ffffff !important; /** tesla全屏背景灰色问题 **/
    }
</style>
