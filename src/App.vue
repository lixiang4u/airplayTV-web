<template>
    <div v-if="isMobileUrl">
        <AppFrameMobile/>
    </div>
    <div v-else>
        <AppFrame/>
    </div>
</template>

<script>
    import AppFrame from './../src/components/AppFrame';
    import AppFrameMobile from './../src/components/AppFrameMobile';

    export default {
        data() {
            return {
                isMobileUrl: false,
            }
        },
        components: {
            AppFrame, AppFrameMobile
        },
        created() {
            this.updateIsMobileUrl();
            if (this.isMobileUrl) {
                this.updateTvId();
            }
        },
        methods: {
            updateIsMobileUrl() {
                let pathName = '';
                let p = location.pathname.trim();
                p.split('/').forEach(function (v) {
                    if (pathName) {
                        return true;
                    }
                    if (!v) {
                        return false;
                    }
                    pathName = v;
                });
                this.isMobileUrl = pathName.toLowerCase() === 'mobile'.toLowerCase();
            },
            updateTvId() {
                let tvId = this.$route.query['tv_id'] || null;
                if (tvId) {
                    localStorage['tv_id'] = tvId;
                }
            },
        }
    }
</script>

<style>
    body {
        background-color: #ffffff !important; /** tesla全屏背景灰色问题 **/
    }
</style>
