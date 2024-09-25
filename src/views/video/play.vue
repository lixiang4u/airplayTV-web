<template>
  <div class="">
    <meta name="referrer" content="no-referrer">
    <p v-if="videoPlayInfo" class="text-h4 text-center flex-center">{{
        videoPlayInfo.name
      }}<sup>[{{ sourceName }}]</sup></p>
    <div id="dplayer"></div>
    <div class="q-my-lg tips" v-if="videoPlayInfo">
      <div class="text-red-7">如果播放不了？优先切换<a href="/about?#source">片源/数据源</a>试试吧！！！</div>
      <div class="link">
        {{ videoPlayInfo.url }}
        ,<a :href="videoPlayInfo.url" target="_blank">
        打开调试
        <svg class="icon"
             style="width: 1.001953125em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
             viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1347">
          <path
              d="M897.024 0q26.624 0 49.664 10.24t40.448 27.648 27.648 40.448 10.24 49.664l0 576.512q0 26.624-10.24 49.664t-27.648 40.448-40.448 27.648-49.664 10.24l-128 0 0-128 63.488 0q26.624 0 45.568-18.432t18.944-45.056l0-320.512q0-26.624-18.944-45.568t-45.568-18.944l-512 0q-26.624 0-45.568 18.944t-18.944 45.568l0 63.488-128 0 0-256q0-26.624 10.24-49.664t27.648-40.448 40.448-27.648 49.664-10.24l641.024 0zM576.512 448.512q26.624 0 49.664 10.24t40.448 27.648 27.648 40.448 10.24 49.664l0 256q0 26.624-10.24 49.664t-27.648 40.448-40.448 27.648-49.664 10.24l-384 0q-26.624 0-50.176-10.24t-40.96-27.648-27.648-40.448-10.24-49.664l0-256q0-26.624 10.24-49.664t27.648-40.448 40.96-27.648 50.176-10.24l384 0zM576.512 704.512q0-26.624-18.944-45.056t-45.568-18.432l-256 0q-26.624 0-45.056 18.432t-18.432 45.056l0 64.512q0 26.624 18.432 45.056t45.056 18.432l256 0q26.624 0 45.568-18.432t18.944-45.056l0-64.512z"
              p-id="1348"></path>
        </svg>
      </a>
      </div>
    </div>
    <div class="text-center flex-center text-grey-7 no-video-list" v-else>
      {{ statusText }}
    </div>
    <canvas id="qr-content" style="display: none;"></canvas>
  </div>
</template>

<script>
import 'quasar';
import DPlayer from 'dplayer';
import Hls from 'hls.js';
import {
  getLocalVideoMaxTime,
  getLocalVideoSource,
  setLocalVideoMaxTime,
  setLocalVideoSource,
  setM3u8pCache
} from '@/helper/localstorage';
import store from '@/store/index'
import md5 from 'md5/md5';

export default {
  name: 'VideoPlayInfo',
  data() {
    return {
      videoPlayInfo: null,
      dp2: null,
      hls2: null,
      vid: '',
      sourceName: getLocalVideoSource(),
      statusText: '加载中...',
    }
  },
  created() {
    if (this.$route.query['_source']) {
      setLocalVideoSource(this.$route.query['_source']);
    }
    if (this.$route.query['_m3u8p']) {
      setM3u8pCache(this.$route.query['_m3u8p']);
    }
    this.getVideoPlayInfo(this.$route.params.id, this.$route.query.vid, this.$route.query.title);
    console.log('[params]', {id: this.$route.params.id, vid: this.$route.query.vid});
  },
  beforeUnmount() {
    // https://blog.csdn.net/NuoYan3327/article/details/121343489
    if (this.hls2) {
      console.log('[hls destroy...]', this.hls2)
      this.hls2.destroy();
    }
    if (this.dp2) {
      console.log('[dp destroy...]', this.dp2)
      this.dp2.pause();
      this.dp2.destroy();
    }
  },
  methods: {
    getVideoPlayInfo(id, vid, title) {
      this.axios.get('/api/video/source', {params: {id: id, vid: vid,}}).then((response) => {
        console.log('[getVideoPlayInfo.response]', response.data);
        this.videoPlayInfo = response.data;
        if (!this.videoPlayInfo['name']) {
          this.videoPlayInfo['name'] = title;
        }
        this.doPlay(this.videoPlayInfo);
      });
    },
    getVideoConfig(obj) {
      let me = this
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

              let hls2 = new Hls();
              hls2.loadSource(video.src);
              hls2.attachMedia(video);
              me.hls2 = hls2;
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
        screenshot: false,
        theme: "#00b2c2",
        video: video,
      });
      this.dp2.on('error', function (a, b, c) {
        console.log('[play.error]', a, b, c);
      });
      store.commit('setVideoPlayer', this.dp2);

      // 设置附加属性
      this.dp2.videoSource = obj;

      console.log('[getLocalVideoMaxTime]', getLocalVideoMaxTime(md5(obj.url)));

      // dp.seek(time: number)
      // dp.notice(text: string, time: number): 显示通知，时间的单位为毫秒，默认时间 2000 毫秒，默认透明度 0.8

      let prevTime = 0;
      let tmpVideo = this.dp2;

      this.dp2.on('timeupdate', function () {
        if (tmpVideo.video.currentTime - 5 >= prevTime) {
          prevTime = tmpVideo.video.currentTime;

          // 记录播放时间
          setLocalVideoMaxTime(md5(obj.url), {
            maxTime: tmpVideo.video.currentTime,
            duration: tmpVideo.video.duration,
            id: obj.id,
            name: obj.name,
            url: obj.url,
            thumb: obj.thumb,
          });
        }
      });

      // 电视设备播放后暂停图标不消失
      document.querySelector('.dplayer-mobile-play').style.display = 'none';
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

#dplayer video {
  max-height: 630px !important;
}

.tips {
  line-height: 180%;
}

.link a {
  color: #c3c3c3;
}

.no-video-list {
  margin-top: 200px;
}
</style>
