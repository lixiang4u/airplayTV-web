<template>
  <div class="main" v-if="videoInfo">
    <div class="">
      <img referrerpolicy="no-referrer" class="thumb" :src="videoInfo.thumb"
           onerror="this.src='http://iph.href.lu/180x256'" :alt="videoInfo.name">
    </div>
    <div class="info">
      <p class="name text-h4">{{ videoInfo.name }}</p>
      <p class="tips text-red">如关联了设备，则投射到设备，否则直接播放</p>
      <p class="intro"><b>介绍：</b>{{ videoInfo.intro }}</p>
      <div class="play-list">
        <span hidden>{{ tmpLoopIndex = 1 }}</span>
        <div v-for="(g,idx) in videoInfo['links']" :key="idx">
          <div class="group-title q-my-sm"><b>资源来源{{ tmpLoopIndex++ }}</b></div>
          <router-link
              :to="{ name: 'video-play', params: { id: v.id }, query:{vid:videoInfo.id, title:videoInfo.name}}"
              v-for="(v,idx2) in g" :key="idx2">
            <span class="item">{{ v.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!videoInfo" class="col-12">
    <div class="text-center flex-center text-grey-7 no-video-list">{{ statusText }}</div>
  </div>
</template>

<script>
import 'quasar';

export default {
  name: 'VideoDetail',
  data() {
    return {
      videoInfo: null,
      statusText: '加载中...',
    }
  },
  created() {
    this.getVideoInfo(this.$route.params.id);
  },
  methods: {
    getVideoInfo(id) {
      this.axios.get('/api/video/detail', {params: {id: id,}}).then((response) => {
        console.log('[getVideoInfo.response]', response.data);
        let d = response.data;
        d['links'] = this.groupVideoLinks(response.data['links'], 'group');
        this.videoInfo = d;
      });
    },
    groupVideoLinks(data, keyName) {
      let tmpGroup = {};
      if (!data) {
        return tmpGroup;
      }
      data.forEach(function (item) {
        if (!tmpGroup[item[keyName]]) {
          tmpGroup[item[keyName]] = [];
        }
        tmpGroup[item[keyName]].push(item);
      });
      return tmpGroup;

    },
  },
  computed: {}
}

</script>

<style scoped>
.main {
  display: flex;
  padding: 0 20px 24px 20px;
  flex-wrap: wrap;
}

.main > div:nth-child(1) {
  flex: 1;
}

.main > div:nth-child(2) {
  flex: 3;
  padding: 0 0 0 20px;
}

@media (max-width: 700px) {
  .main {
    flex-direction: column;
  }

  .main > div:nth-child(1) {
    padding: 0 0 20px 0;
    display: flex;
    justify-content: center; /**居中**/
  }
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
  min-width: 76px;
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

.no-video-list {
  margin-top: 200px;
}
</style>
