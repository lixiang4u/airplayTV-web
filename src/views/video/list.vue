<template>
  <div>
    <div class="video-list">
      <div class=" item" v-for="(v,idx) in videoList" :key="idx">
        <span class="hd">{{ v.resolution }}</span>
        <router-link :to="{ name: 'video-detail', params: { id: v.id }}">
          <img referrerpolicy="no-referrer" class="thumb" :src="v.thumb" onerror="this.src='http://iph.href.lu/180x256'"
               alt="v.name">
        </router-link>
        <p>{{ v.name }}</p>
      </div>
      <div v-if="!videoList" class="col-12">
        <div class="text-center flex-center text-grey-7 no-video-list">{{ statusText }}</div>
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
      statusText: '加载中...',
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
      this.updateStatusText(true)
      console.log('[this.videoList]', this.videoList);
      this.axios.get('/api/video/tag', {params: {tagName: tagName, p: page}}).then((response) => {
        this.updateStatusText(false)
        this.videoList = response.data['list'];

        this.updatePager(response.data['current'], response.data['total'], response.data['limit']);
      });
    },
    searchVideoList(search, page) {
      this.updateStatusText(true)
      this.axios.get('/api/video/search', {params: {q: search, p: page}}).then((response) => {
        this.updateStatusText(false)
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
    updateStatusText(isLoading) {
      if (isLoading) {
        this.statusText = '加载中...';
      } else {
        this.statusText = '没有数据';
      }
    },
  },
}

</script>

<style scoped>
.video-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /**居中**/
  flex-direction: row;
}

@media (max-width: 700px) {
  .video-list .item {
    width: 186px !important;
  }

  .video-list .thumb {
    width: 162px !important;
  }
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
  align-self: center;;
}

.video-list .item {
  width: 200px;
  height: 306px;
  padding: 5px 12px 5px 12px;
  color: #333;
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
