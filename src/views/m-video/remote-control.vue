<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

    <div class="tv_id_info q-mb-lg">关联设备: {{ getTvId() }}</div>
    <div class="main">
      <div class="q-my-lg"></div>

      <div class="flex justify-around text-center">
        <q-icon @click="goBack()" name="power_settings_new" size="3em"/>
        <q-icon @click="onClick('fullscreen')" name="fullscreen" size="3em" v-if="showFullscreen"/>
        <q-icon @click="onClick('fullscreen_exit')" name="fullscreen_exit" size="3em" v-else/>
        <q-icon @click="onClick('qr_code')" name="qr_code" size="3em"/>
        <q-icon @click="onClick('show_info')" name="info" size="3em"/>
      </div>
      <div class="q-my-lg"></div>

      <div class="flex justify-around text-center">
        <q-icon @click="onClick('volume_up', 15)" name="volume_up" size="3em"/>
      </div>
      <div class="q-my-lg"></div>

      <div class="flex justify-around text-center">
        <q-icon @click="onClick('fast_rewind')" name="fast_rewind" size="3em"/>
        <q-icon @click="onClick('play')" name="play_circle_outline" size="3em" v-if="showPlay"/>
        <q-icon @click="onClick('pause')" name="pause_circle_outline" size="3em" v-else/>
        <q-icon @click="onClick('fast_forward')" name="fast_forward" size="3em"/>
      </div>
      <div class="q-my-lg"></div>

      <div class="flex justify-around text-center">
        <q-icon @click="onClick('volume_down', 15)" name="volume_down" size="3em"/>
      </div>

      <div class="q-my-lg"></div>
      <div class="flex justify-around text-center">
        <q-icon @click="onClick('volume_0')" name="volume_off" size="3em"/>
        <q-icon @click="onClick('last_play')" name="trending_up" size="3em"/>
      </div>

      <div class="q-my-lg"></div>

      <q-separator inset spaced />

      <div class="q-pt-md"></div>

      <div>
        <q-item>
          <q-item-section avatar>
            <q-icon color="secondary" name="volume_up" />
          </q-item-section>
          <q-item-section>
            <q-slider
                v-model="volume_progress"
                :min="0"
                :max="100"
                label
                :label-value="'Volume: ' + volume_progress + '%'"
                color="secondary"
            />
          </q-item-section>
          <q-item-section avatar>
            <q-icon color="secondary" name="redo" @click="onClick('volume_progress', volume_progress)" />
          </q-item-section>
        </q-item>
      </div>
      <div class="q-pt-md"></div>
      <div>
        <q-item>
          <q-item-section avatar>
            <q-icon color="secondary" name="pause" />
          </q-item-section>
          <q-item-section>
            <q-slider
                v-model="video_progress"
                :min="0"
                :max="100"
                label
                :label-value="'Video: ' + video_progress + '%'"
                color="secondary"
            />
          </q-item-section>
          <q-item-section avatar>
            <q-icon color="secondary" name="redo" @click="onClick('video_progress', video_progress)" />
          </q-item-section>
        </q-item>
      </div>
    </div>

    <div v-if="!videoInfo" class="col-12">
      <div class="text-center flex-center text-grey-7 no-video-list">{{ statusText }}</div>
    </div>

  </div>
</template>

<script>
import 'quasar';
import {getLocalClientId} from "@/helper/localstorage";
import { ref } from 'vue'

export default {
  name: 'VideoDetail',
  setup () {
    return {
      volume_progress: ref(0),
      video_progress: ref(0),
    }
  },
  data() {
    return {
      videoInfo: null,
      statusText: '请扫码后使用遥控器...',
      showFullscreen: true,
      showPlay: true,
    }
  },
  created() {
    console.log('[this.$route]', this.$route);
  },
  methods: {
    getTvId() {
      return getLocalClientId();
    },
    goBack() {
      this.$router.back();
    },
    transformShowStatus(val) {
      if (val === 'fullscreen' || val === 'fullscreen_exit') {
        this.showFullscreen = !this.showFullscreen;
      }
      if (val === 'play' || val === 'pause') {
        this.showPlay = !this.showPlay;
      }
    },
    onClick(val, value) {
      console.log('[onClick]', val);
      let clientId = getLocalClientId();

      this.axios.get('/api/video/controls', {
        params: {
          client_id: clientId,
          control: val,
          value: value,
        }
      }).then((response) => {
        console.log('[sendPlayControlsMessage.response]', response.data);

        if (response.data['code'] === 200) {
          this.transformShowStatus(val);
        }

        this.$q.notify({
          message: response.data['msg'] ?? '未知错误',
          color: 'purple',
          position: 'top',
        })
      });
    },
  },
  computed: {}
}

</script>

<style scoped>
.main {
  max-width: 360px;
  margin: 0 auto;
  padding: 0 20px 0 20px;
}

.main > div {
  display: flex;
  justify-content: space-around;
}

.q-icon {
  color: #57abb8;
}

.tv_id_info {
  padding: 0 22px 0 22px;
}

.no-video-list {
  margin-top: 200px;
}
</style>
