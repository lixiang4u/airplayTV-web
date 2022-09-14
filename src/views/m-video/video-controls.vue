<template>
  <q-layout>
    <q-page-sticky position="bottom-right" :offset="fabPos">
      <q-fab
          icon="keyboard_arrow_up"
          direction="up"
          color="accent"
          :disable="draggingFab"
          v-touch-pan.prevent.mouse="moveFab"
      >
        <q-fab-action @click="onClick('fullscreen_exit')" color="primary" icon="fullscreen_exit" label="缩小"
                      :disable="draggingFab"/>
        <q-fab-action @click="onClick('fullscreen')" color="primary" icon="fullscreen" label="全屏"
                      :disable="draggingFab"/>
        <q-fab-action @click="onClick('pause')" color="primary" icon="pause_presentation" label="暂停"
                      :disable="draggingFab"/>
        <q-fab-action @click="onClick('play')" color="primary" icon="connected_tv" label="播放"
                      :disable="draggingFab"/>
        <q-fab-action @click="onClick('qr_code')" color="primary" icon="qr_code" label="扫码" :disable="draggingFab"/>
      </q-fab>
    </q-page-sticky>
  </q-layout>

</template>

<script>
import {getLocalClientId} from "@/helper/localstorage";
// import Notify from 'quasar';

export default {
  name: 'VideoControls',
  data() {
    return {
      fabPos: [30, 30],
      draggingFab: false
    }
  },

  methods: {
    onClick(val) {
      let clientId = getLocalClientId();
      console.log('[onClick]', val);

      this.axios.get('/api/video/controls', {
        params: {
          client_id: clientId,
          control: val,
        }
      }).then((response) => {
        console.log('[sendPlayControlsMessage.response]', response.data);
        this.$q.notify({
          message: response.data['msg'] ?? '未知错误',
          color: 'purple',
          position: 'center',
        })
      });

    },
    moveFab(ev) {
      console.log('[moveFab]', ev)
    }
  }
}
</script>


<style scoped>

</style>
