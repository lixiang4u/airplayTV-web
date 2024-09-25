<template>
  <div class="main">
    <div class="q-mb-lg">
      <p class="text-h4">免责声明：</p>
      <p>本软件仅作学习研究，请勿用于其它任何场景。作者不承担一切不正当使用本软件的责任。</p>

      <p>&nbsp;</p>
    </div>
    <div class="q-mb-lg">
      <p class="text-h4">说明：</p>
      <p>数据采集自网络</p>
      <p>本站不存储任何视频相关数据</p>
      <p>原视频网站对非国内ip请求做了限制，导致部分视频可能无法观看</p>
      <p>
        使用
        <router-link to="/fullscreen">[TΞSLA 全屏]</router-link>
        可通过 <b>腾讯视频</b>-><b>爆米花</b>-><b>本站</b> 多级重定向实现打开本站的全屏模式
      </p>
      <p>全屏模式下<b>可能</b>无法打开虚拟键盘，重新打开尝试即可</p>
      <p>^^</p>
    </div>
    <div class="q-mb-lg">
      <p class="text-h4">播放不了？</p>
      <p>如果播放不了？优先切换<b>片源/数据源</b>试试吧！！！</p>
      <p>如果播放不了？可能某些资源未适配（XLimit），需要（<b>Coding</b>）</p>
      <p>如果播放不了？服务器在海外，可能某些资源无法访问（需要<b>国内部署</b>）</p>
      <p>如果播放不了？部分请求存在人机验证（<b>多点两次</b>试试？）️</p>
      <p>如果播放地址是(https://vip.shankuwang.com:8443)域名下的，需要云解析，<b>暂未实现</b>功能。</p>
      <p>其他播放问题可先尝试刷新，或者换<b>视频源</b>试试，或者关闭<b>数据缓存</b>试试？⬇️</p>
      <p>-_-</p>
    </div>
    <div class="q-mb-lg">
      <p class="text-h4">视频源（默认由后台接口随机分配）：{{ currentVideoSource }}</p>
      <div>
        <q-checkbox size="md" @click="changeSource('ys')" v-model="videoSource.ys"
                    label="源6(ys)（如果效果不行请更换其他源）"/>
      </div>
      <div>
        <q-checkbox size="md" @click="changeSource('xk')" v-model="videoSource.xk"
                    label="源7(xk)（如果效果不行请更换其他源）"/>
      </div>
      <div>
        <q-checkbox size="md" @click="changeSource('cz')" v-model="videoSource.cz"
                    label="源1(cz)（质量较高，有时候需要cloudflare challenge）"/>
      </div>
      <div>
        <q-checkbox size="md" @click="changeSource('nn')" v-model="videoSource.nn"
                    label="源2(nn)（如果效果不行请更换其他源）"/>
      </div>
      <div>
        <q-checkbox size="md" @click="changeSource('my')" v-model="videoSource.my"
                    label="源3(my)（如果效果不行请更换其他源）"/>
      </div>
      <div>
        <q-checkbox size="md" @click="changeSource('lv')" v-model="videoSource.lv"
                    label="源4(lv)（如果效果不行请更换其他源）(海外)（片源质量差）"/>
      </div>
      <div>
        <q-checkbox size="md" @click="changeSource('five')" v-model="videoSource.five"
                    label="源5(five)（如果效果不行请更换其他源）"/>
      </div>
      <div>
        <q-checkbox size="md" @click="changeSource('myd')" v-model="videoSource.myd"
                    label="源8(myd)（如果效果不行请更换其他源）"/>
      </div>
    </div>
    <div class="q-mb-lg">
      <p class="text-h4">服务器加速：{{ m3u8pStatus }}</p>
      <div>
        <q-checkbox size="md" @click="setM3u8pToLS(m3u8pStatus)" v-model="m3u8pStatus"
                    label="服务器加速是将视频流通过服务器代理访问(如果服务器不在大陆，访问大陆外的视频流有加速效果)"/>
      </div>
    </div>
    <div class="q-mb-lg">
      <p class="text-h4">数据缓存（加速访问）：{{ currentCacheStatus }}</p>
      <div>
        <q-checkbox size="md" @click="changeCache('Open')" v-model="cacheStatus.Open"
                    label="开启缓存（默认开启，每天更新一次，开启后可能导致部分视频无法观看/更新不及时）"/>
      </div>
      <div>
        <q-checkbox size="md" @click="changeCache('Close')" v-model="cacheStatus.Close"
                    label="关闭缓存（默认开启，每天更新一次，开启后可能导致部分视频无法观看/更新不及时）"/>
      </div>
    </div>
    <div class="q-mb-lg">
      <p class="text-h4">客户端ID：</p>
      <pre>ID: {{ clientId }}</pre>
    </div>
    <div class="q-mb-lg">
      <p class="text-h4">调试信息：</p>
      <pre>navigator: {{ navigator }}</pre>
      <pre>location: {{ location }}</pre>
    </div>
    <div class="q-mb-lg">
      <p class="text-h4">播放历史：</p>
      <pre>{{ videoHistoryList }}</pre>
    </div>
    <div class="q-mb-lg">&nbsp;</div>
  </div>
</template>

<script>
import {ref} from 'vue';
import {
  getLocalCache,
  getLocalClientId,
  getLocalVideoList,
  getLocalVideoSource,
  getM3u8pCache,
  setLocalCache,
  setLocalVideoSource,
  setM3u8pCache
} from '@/helper/localstorage';

export default {
  name: 'AboutComponent',
  data() {
    return {
      videoSource: {
        cz: false,
        nn: false,
        my: false,
        lv: false,
        five: false,
        ys: false,
        xk: false,
        myd: false,
      },
      currentVideoSource: '',

      cacheStatus: {
        Open: true,
        Close: false,
      },
      m3u8pStatus: ref(false),
      currentCacheStatus: '',
      fileModel: ref(null),
      videoHistoryList: {},
      clientId: '',
    }
  },
  mounted() {
    this.clientId = getLocalClientId();

    this.loadVideoSourceToLS();
    this.loadCacheStatusToLS();
    this.loadLocalVideoHistory();
    this.loadM3u8pToLS();
  },
  methods: {
    changeSource: function (key) {
      this.setVideoSourceToLS(key);

      if (this.videoSource[key] === false) {
        return false
      }
      for (let k in this.videoSource) {
        if (k === key) {
          continue;
        }
        this.videoSource[k] = false;
      }
    },
    setVideoSourceToLS: function (sourceKey) {
      setLocalVideoSource(sourceKey);
      this.currentVideoSource = sourceKey;
    },
    setCacheStatusToLS: function (sourceKey) {
      setLocalCache(sourceKey);
      this.currentCacheStatus = sourceKey;
    },
    setM3u8pToLS: function (sourceKey) {
      sourceKey = !!sourceKey
      setM3u8pCache(sourceKey);
      this.m3u8pStatus = sourceKey;
    },
    loadM3u8pToLS: function () {
      this.m3u8pStatus = getM3u8pCache();
    },
    loadVideoSourceToLS: function () {
      let key = getLocalVideoSource();
      for (let k in this.videoSource) {
        this.videoSource[k] = (k === key);
      }
      this.currentVideoSource = key;
    },
    loadCacheStatusToLS: function () {
      let key = getLocalCache();
      for (let k in this.cacheStatus) {
        this.cacheStatus[k] = (k === key);
      }
      this.currentCacheStatus = key;
    },
    changeCache: function (key) {
      this.setCacheStatusToLS(key);

      if (this.cacheStatus[key] === false) {
        return false
      }
      for (let k in this.cacheStatus) {
        if (k === key) {
          continue;
        }
        this.cacheStatus[k] = false;
      }
    },
    loadLocalVideoHistory: function () {
      this.videoHistoryList = getLocalVideoList();
    }
  },
  computed: {
    navigator: function () {
      return {
        appCodeName: window.navigator.appCodeName,
        appName: window.navigator.appName,
        appVersion: window.navigator.appVersion,
        connection: window.navigator.connection,
        language: window.navigator.language,
        languages: window.navigator.languages,
        platform: window.navigator.platform,
        product: window.navigator.product,
        productSub: window.navigator.productSub,
        userAgent: window.navigator.userAgent,
        vendor: window.navigator.vendor,
        vendorSub: window.navigator.vendorSub,
      }
    },
    location: function () {
      return {
        host: window.location.host,
        hostname: window.location.hostname,
        href: window.location.href,
        origin: window.location.origin,
        pathname: window.location.pathname,
        port: window.location.port,
        protocol: window.location.protocol,
        search: window.location.search,
      }
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 80px;
  padding: 0 20px 0 20px;
}

.main .q-field {
  max-width: 360px;
}
</style>
