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

    export default {
        name: 'QrIndexComponent',
        data() {
            return {
                clientId: '',
                websocket: null,
                websocketUrl: '//tv.artools.cc/api/ws',
            }
        },
        mounted() {
            this.websocket = this.$store.state.wss;
            this.clientId = this.$store.state.clientId;
            if (this.websocket == null) {
                console.log('[init websocket]');
                this.initWebSockets();
            } else {
                this.updateClientInfo({'client_id': this.clientId})
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
                        break;
                    default:
                        console.log('未知类型消息');
                        break;
                }
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

                let qrUrl = "https://tv.artools.cc/home?tv_id=" + msg['client_id'] + "&t=" + msg['timestamp'];

                console.log('[url]', qrUrl);

                this.clientId = msg['client_id'];
                QRCode.toCanvas(document.getElementById('qr-content'), qrUrl, {
                    errorCorrectionLevel: 'H',
                    type: 'image/jpeg',
                    quality: 0.3,
                    width: 300
                });
            }
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