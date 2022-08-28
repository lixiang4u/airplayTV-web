<template>
    <div>
        <div class="row justify-around video-list">
            <div class="col-sm-5 item" v-for="(v,idx) in videoList" :key="idx">
                <span class="hd">{{v.resolution}}</span>
                <router-link :to="{ name: 'mobile-video-detail', query: { id: v.id }}">
                    <img class="thumb" :src="v.thumb" alt="v.name">
                </router-link>
                <p>{{ v.name }}</p>
            </div>
            <div v-if="!videoList" class="col">
                <div class="text-center flex-center text-grey-7 no-video-list">加载中... | 没有数据</div>
            </div>
        </div>
        <div class="row" v-if="videoList">
            <div class="col-12">
                <div class="q-pa-lg flex flex-center pager">
                    <router-link :to="{ query: { q: search,p:prev }}">« 上一页</router-link>
                    <router-link :to="{ query: { q: search,p:next }}">下一页 »</router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import 'quasar';

    export default {
        name: 'VideoList',
        data() {
            return {
                search: '',
                next: 1,
                prev: 1,

                videoList: null,
            }
        },
        created() {
            let tvId = this.$route.query['tv_id'] || null;
            if (tvId) {
                localStorage['tv_id'] = tvId;
            }
        },
        mounted() {
            const search = this.$route.query['q'];
            const page = this.$route.query['p'];
            const tag = (this.$route.params['tag'] || 'movie_bt');

            this.search = search;

            if (search && search.trim() !== '') {
                this.searchVideoList(search, page)
            } else {
                this.getTagVideoList(tag, page);
            }
        },
        methods: {
            getTagVideoList(tagName, page) {
                console.log('[this.videoList]', this.videoList);
                this.axios.get('/api/video/tag', {params: {tagName: tagName, p: page}}).then((response) => {
                    this.videoList = response.data['list'];

                    this.updatePager(response.data['current'], response.data['total'], response.data['limit']);
                });
            },
            searchVideoList(search, page) {
                this.axios.get('/api/video/search', {params: {q: search, p: page}}).then((response) => {
                    this.videoList = response.data['list'];

                    this.updatePager(response.data['current'], response.data['total'], response.data['limit']);
                });
            },
            updatePager(current, total, limit) {
                this.prev = current - 1;
                if (this.prev <= 0) {
                    this.prev = 1;
                }
                this.next = current + 1;
                if (this.next * limit > total + limit) {
                    this.next = current;
                }
            },
            getTvId() {
                return localStorage['tv_id'];
            },
        },
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
        width: 158px;
        height: 233px;
        border-radius: 8px;
    }

    .video-list .item {
        /*padding: 5px 10px 5px 10px;*/
        color: #333;
    }

    .video-list .item p {
        width: 158px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .no-video-list {
        margin-top: 200px;
    }

    .pager a {
        padding: 5px 10px 5px 10px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        color: #337ab7;
        text-decoration: none;
    }

    .pager a:hover {
        text-decoration: underline;
    }
</style>
