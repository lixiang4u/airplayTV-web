import {createStore} from 'vuex'

const store = createStore({
  state() {
    return {
      count: 0,
      wss: null,
      clientId: null,
      isJumpTv: null,
      dp2: null,
      hls2: null,
      maxTime: null,
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setWebsocket(state, wss) {
      state.wss = wss
    },
    setClientId(state, clientId) {
      state.clientId = clientId
    },
    setJumpTv(state, isJumpTv) {
      state.isJumpTv = isJumpTv
    },
    setVideoPlayer(state, dp2) {
      state.dp2 = dp2
    },
    setVideoHLS(state, hsl2) {
      state.hls2 = hsl2
    },
  }
});

export default store;
