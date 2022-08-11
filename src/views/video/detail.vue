<template>
    <div>
        detail
        {{ $route.params.id }}
        {{ videoInfo }}
    </div>

</template>

<script>
    import 'quasar';

    export default {
        name: 'VideoDetail',
        data() {
            return {
                videoInfo: null
            }
        },
        created() {
            this.getVideoInfo(this.$route.params.id);
        },
        methods: {
            getVideoInfo(id) {
                this.axios.get('/api/info/' + id).then((response) => {
                    console.log('[getVideoInfo.response]', response.data);
                    this.videoInfo = response.data
                });
            }
        },
        computed: {}
    }

</script>

<style scoped>

</style>
