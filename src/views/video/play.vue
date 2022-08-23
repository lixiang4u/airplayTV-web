<template>
    <div class="">
        <meta name="referrer" content="no-referrer">
        <p v-if="videoPlayInfo" class="text-h4 text-center flex-center">{{ videoPlayInfo.name }}</p>
        <div id="dplayer"></div>
        <div class="q-my-lg" v-if="videoPlayInfo">
            <div class="text-red-7">如果播放不了，但是下面地址可以访问，可能是服务器不在大陆导致（需要国内部署）</div>
            <div>{{ videoPlayInfo.url }}</div>
        </div>
    </div>
</template>

<script>
    import 'quasar';
    import DPlayer from 'dplayer';
    import Hls from 'hls.js';

    export default {
        name: 'VideoPlayInfo',
        data() {
            return {
                videoPlayInfo: null,
                dp2: null,
            }
        },
        created() {
            this.getVideoPlayInfo(this.$route.params.id);
            console.log('[id]', this.$route.params.id);
        },
        beforeUnmount() {
            if (this.dp2) {
                this.dp2.destroy();
            }
        },
        methods: {
            getVideoPlayInfo(id) {
                this.axios.get('/api/video/source/' + id, {params: {}}).then((response) => {
                    console.log('[getVideoPlayInfo.response]', response.data);
                    this.videoPlayInfo = response.data;
                    this.doPlay(this.videoPlayInfo);
                });
            },
            getVideoConfig(obj) {
                // auto，mp4，hls
                let video = {
                    url: obj.url,
                    autoplay: true,
                    type: "auto",
                };
                if (obj.type === 'hls') {
                    video = {
                        url: obj.url,
                        autoplay: true,
                        // url:'https://hll.aliyundrive.asia/vtt/movie1/m/03/神偷奶爸3.m3u8',
                        type: 'customHls',
                        customType: {
                            customHls: function (video, player) {
                                console.log('[video]', video);
                                console.log('[player]', player);

                                const hls = new Hls();
                                hls.loadSource(video.src);
                                hls.attachMedia(video);
                            },
                        },
                    }
                }
                return video;
            },
            doPlay(obj) {
                obj.url = this.handleUrl(obj.url);

                const video = this.getVideoConfig(obj);

                this.dp2 = new DPlayer({
                    container: document.getElementById('dplayer'),
                    autoplay: true,
                    theme: "#00b2c2",
                    video: video,
                });
                this.dp2.on('error', function (a, b, c) {
                    console.log('[play.error]', a, b, c);
                });
            },
            handleUrl(url) {
                if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
                    return url;
                }
                if (url.indexOf('/') === 0) {
                    url = url.substr(1);
                }
                return location.origin + "/" + url;
            },
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
