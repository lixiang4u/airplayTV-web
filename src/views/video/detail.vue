<template>
    <div>
        <img class="thumb" :src="videoInfo.thumb" :alt="videoInfo.name">
        <p class="name">{{ videoInfo.name }}</p>
        <p class="tips">如关联了设备，则投射到设备，否则直接播放</p>
        <div class="play-list">
            <span class="item" v-for="(item,idx) in videoInfo.links" :key="idx">{{ item.name }}</span>
        </div>
        <p class="intro"><b>介绍：</b>{{ videoInfo.intro }}</p>
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
                this.axios.get('/api/video/detail/' + id).then((response) => {
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
