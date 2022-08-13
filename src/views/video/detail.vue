<template>
    <div class="row main">
        <div class="col-3">
            <img class="thumb" :src="videoInfo.thumb" :alt="videoInfo.name">
        </div>
        <div class="col-9 info">
            <p class="name text-h4">{{ videoInfo.name }}</p>
            <p class="tips text-red">如关联了设备，则投射到设备，否则直接播放</p>
            <p class="intro"><b>介绍：</b>{{ videoInfo.intro }}</p>
            <div class="play-list">
                <span class="item" v-for="(item,idx) in videoInfo.links" :key="idx">{{ item.name }}</span>
                <span class="item" v-for="(item,idx) in videoInfo.links" :key="idx">{{ item.name }}</span>
                <span class="item" v-for="(item,idx) in videoInfo.links" :key="idx">{{ item.name }}</span>
                <span class="item" v-for="(item,idx) in videoInfo.links" :key="idx">{{ item.name }}</span>
                <span class="item" v-for="(item,idx) in videoInfo.links" :key="idx">{{ item.name }}</span>
            </div>
        </div>
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
    .main {
        padding-bottom: 24px;
    }

    .thumb {
        width: 260px;
        height: 386px;
        border-radius: 8px;
    }

    .info {
        line-height: 180%;
    }

    .play-list .item {
        background-color: #0c81e8;
        padding: 8px 16px;
        margin: 7px 16px 7px 0;
        display: inline-block;
        border-radius: 5px;
        color: #c8dde6;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
    }
</style>
