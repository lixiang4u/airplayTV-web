<template>
    <div class="row video-list">
        <div class="col-2 item" v-for="(v,idx) in videoList" :key="idx">
            <span class="hd">{{v.resolution}}</span>
            <router-link :to="{ name: 'video-detail', params: { id: v.id }}">
                <img class="thumb" :src="v.thumb" alt="v.name">
            </router-link>
            <p>{{ v.name }}</p>
        </div>
    </div>

</template>

<script>
    import 'quasar';

    export default {
        name: 'VideoList',
        data() {
            return {
                videoList: null
            }
        },
        created() {
            if (this.videoList == null) {
                this.getVideoList();
            }
        },
        methods: {
            getVideoList() {
                console.log('[this.videoList]', this.videoList);

                this.axios.get('/api/tag').then((response) => {
                    console.log('[getVideoList.response]', response.data);
                    this.videoList = response.data['list']
                });
            }
        }
    }

</script>

<style scoped>
    .video-list {
    }

    .video-list .hd {
        display: block;
        padding: 4px 5px;
        color: #fff;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-top-left-radius: 8px;
        margin-bottom: 3px;
        position: absolute;
        background-color: rgba(255, 92, 138, 0.85);
    }

    .video-list .thumb {
        width: 178px;
        height: 253px;
        border-radius: 8px;
    }

    .video-list .item {
        padding: 5px 10px 5px 10px;
        color: #333;
    }
</style>
