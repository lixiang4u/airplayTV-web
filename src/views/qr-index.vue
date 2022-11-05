<template>
    <div class="text-center flex-center">
        <canvas id="qr-content"></canvas>
        <p class="nav">
            <span>扫码投射</span>|
            <router-link to="/video/list">查看视频</router-link>
        </p>
        <p v-if="clientId">ID: {{ clientId }}</p>
    </div>
</template>

<script>
    import QRCode from 'qrcode';
    import {getCurrentSiteHost} from './../helper/url-helper';
    import {getLocalVideoMaxTime} from "@/helper/localstorage";
    import store from "@/store/index";
    import md5 from "md5/md5";
    import {secondsToHuman} from "@/helper/time";

    export default {
        name: 'QrIndexComponent',
        data() {
            return {
                clientId: '',
                websocket: null,
                websocketUrl: '//' + getCurrentSiteHost() + '/api/ws',
                isTvMode: false,
            }
        },
        mounted() {
            this.websocket = this.$store.state.wss;
            this.clientId = this.$store.state.clientId;
            this.isTvMode = this.$store.state.isJumpTv;

            console.log('[getCurrentSiteHost]', getCurrentSiteHost());

            if (this.websocket == null) {
                console.log('[init websocket]');
                this.initWebSockets();
            } else {
                this.updateClientInfo({'client_id': this.clientId})
            }
            if (this.isTvMode === true) {
                this.gotoTvMode();
            }
        },
        deactivated() {
            this.websocket = null;
        },
        methods: {
            initWebSockets() {
                this.websocket = new WebSocket(this.getWSUrl());
                this.websocket.onopen = this.onWebsocketOpen;
                this.websocket.onerror = this.onWebsocketError;
                this.websocket.onclose = this.onWebsocketClose;
                this.websocket.onmessage = this.onWebsocketMessage;
            },
            onWebsocketOpen(event) {
                this.$store.commit('setWebsocket', this.websocket);

                console.log('[websocket.open]', event);
                this.sendWebsocketMsg({'event': 'info',})
            },
            onWebsocketError(event) {
                console.log('[websocket.error]', event);

            },
            onWebsocketClose(event) {
                console.log('[websocket.close]', event);
            },
            onWebsocketMessage(data) {
                console.log('[websocket.message]', data);
                const msg = JSON.parse(data.data);

                switch (msg['event']) {
                    case 'info':
                        this.updateClientInfo(msg);
                        break;
                    case 'play':
                        //跳转到播放页面
                        this.gotoPlay(msg);
                        break;
                    case 'video_controls':
                        //跳转到播放页面
                        this.videoControls(msg);
                        break;
                    default:
                        console.log('未知类型消息');
                        break;
                }
            },
            gotoPlay(msg) {
                this.$router.push({
                    name: 'video-play',
                    params: {id: (msg['video']['id'] || null)},
                    query: {vid: '', _source: msg['_source']}
                }).then(failure => {
                    if (failure) {
                        console.log('[failure]', failure)
                    }
                });
            },
            getWSUrl() {
                if (location.protocol === 'https:') {
                    return "wss:" + this.websocketUrl;
                }
                return "ws:" + this.websocketUrl;
            },
            sendWebsocketMsg(data) {
                if (!this.websocket) {
                    console.log('[websocket] not init');
                    return false;
                }
                if (this.websocket.readyState !== WebSocket.OPEN) {
                    console.log('[websocket] not ready');
                    return false;
                }
                if (typeof data != 'string') {
                    data = JSON.stringify(data);
                }
                this.websocket.send(data);
            },
            updateClientInfo(msg) {
                this.$store.commit('setClientId', msg['client_id']);

                let qrUrl = "https://" + getCurrentSiteHost() + "/mobile/?tv_id=" + msg['client_id'] + "&t=" + msg['timestamp'];

                console.log('[url]', qrUrl);

                this.clientId = msg['client_id'];
                QRCode.toCanvas(document.getElementById('qr-content'), qrUrl, {
                    errorCorrectionLevel: 'H',
                    type: 'image/jpeg',
                    quality: 0.3,
                    width: 300
                });
            },
            gotoTvMode() {
                document.getElementById('qr-content').setAttribute('style', 'margin-top: 0');
            },
            videoControls(msg) {
              let dp2 = store.state.dp2;
              let hls2 = store.state.hls2;
              let newVol = 0.7;
              switch (msg['control']) {
                case 'qr_code':
                  console.log('[====>this.$route]', this.$route);
                  if (this.$route['name'] === 'video-play') {
                    this.showQrAtPlayer(this.$store.state.clientId, new Date().getTime());
                    document.getElementById('qr-content').setAttribute('style', 'position: fixed; z-index: 9999999; top: 0; right: 0;');
                    document.getElementById('qr-content').style.display = 'block';
                    setTimeout(function () {
                      console.log('[setTimeout1]', document.getElementById('qr-content'));
                      console.log('[setTimeout2]', document.getElementById('qr-content').style);
                      document.getElementById('qr-content').style.display = 'none';
                    }, 1000 * 20);
                    break;
                  }
                  if (this.$route['name'] === 'qr') {
                    break;
                  }
                  if (dp2) {
                    dp2.pause();
                    dp2.destroy();
                  }
                  if (hls2) {
                    hls2.destroy();
                  }
                  this.$router.push({name: 'qr',}).then(failure => {
                    if (failure) {
                      console.log('[failure]', failure)
                    }
                  });
                  // 跳到扫码页面
                  break;
                case 'fullscreen':
                  dp2.fullScreen.request('web');
                  break;
                case 'fullscreen_exit':
                  dp2.fullScreen.cancel('web');
                  break;
                case 'play':
                  dp2.video.play();
                  break;
                case 'pause':
                  dp2.video.pause();
                  break;
                case 'fast_rewind':
                  dp2.video.currentTime = dp2.video.currentTime - 5;
                  break;
                case 'fast_forward':
                  dp2.video.currentTime = dp2.video.currentTime + 5;
                  break;
                case 'volume_down':
                  // eslint-disable-next-line no-case-declarations
                  newVol = (document.querySelector(".dplayer-video").volume * 100 - 2) / 100;
                  dp2.volume(newVol, true, false);
                  break;
                case 'volume_up':
                  // eslint-disable-next-line no-case-declarations
                  newVol = (document.querySelector(".dplayer-video").volume * 100 + 2) / 100;
                  dp2.volume(newVol, true, false);
                  break;
                case 'last_play':
                  // eslint-disable-next-line no-case-declarations
                  let maxVideoTime=getLocalVideoMaxTime(md5(dp2.videoSource.url));
                  dp2.seek(maxVideoTime);
                  break;
                case 'show_info':
                  // eslint-disable-next-line no-case-declarations
                  const  showTime = 10000;
                  dp2.notice('视频名称：'+dp2.videoSource.name, showTime);
                  dp2.notice('上次进度：'+secondsToHuman(getLocalVideoMaxTime(md5(dp2.videoSource.url))), showTime);
                  dp2.notice('当前进度：'+secondsToHuman(dp2.video.currentTime), showTime);
                  dp2.notice('视频时长：'+secondsToHuman(dp2.video.duration), showTime);
                  dp2.notice('视频地址：'+dp2.videoSource.url, showTime);
                  break;
                case 'volume_0':
                  // eslint-disable-next-line no-case-declarations
                  dp2.volume(0, true, false);
                  break;
                default:
                  break;
              }
            },
            showQrAtPlayer(clientId, ts){

              let qrUrl = "https://" + getCurrentSiteHost() + "/mobile/?tv_id=" + clientId + "&t=" + ts;

              console.log('[url]', qrUrl);

              this.clientId = clientId;
              QRCode.toCanvas(document.getElementById('qr-content'), qrUrl, {
                errorCorrectionLevel: 'H',
                type: 'image/jpeg',
                quality: 0.3,
                width: 300
              });
            },
        },
    }
</script>

<style scoped>
    #qr-content {
        margin-top: 80px;
    }

    .nav span {
        padding-right: 4px;
    }
</style>