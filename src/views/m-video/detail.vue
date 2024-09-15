<template>
    <div>
        <div class="tv_id_info q-mb-lg">关联设备: {{getTvId()}}</div>
        <div class="main" v-if="videoInfo">
            <div class="">
                <img referrerpolicy="no-referrer" class="thumb" :src="videoInfo.thumb" onerror="this.src='http://iph.href.lu/180x256'" :alt="videoInfo.name">
            </div>

            <div class="info">
                <p class="name text-h4">{{ videoInfo.name }}</p>
                <p class="tips text-red">如关联了设备，则投射到设备，否则直接播放</p>
                <p class="intro"><b>介绍：</b>{{ videoInfo.intro }}</p>
                <div class="play-list">
                    <span hidden>{{ tmpLoopIndex=1 }}</span>
                    <div v-for="(g,idx) in videoInfo['links']" :key="idx">
                        <div class="group-title q-my-sm"><b>资源来源{{ tmpLoopIndex++ }}</b></div>
                        <span class="item" @click="sendPlayMessage(v.id,videoInfo.id)" v-for="(v,idx2) in g" :key="idx2">
                        {{ v.name }}
                    </span>
                    </div>
                </div>
            </div>
        </div>
      <div v-if="!videoInfo" class="col-12">
        <div class="text-center flex-center text-grey-7 no-video-list">{{statusText}}</div>
      </div>

    </div>
</template>

<script>
    import 'quasar';
    import {getLocalClientId} from "@/helper/localstorage";

    export default {
        name: 'VideoDetail',
        data() {
            return {
                videoInfo: null,
                statusText: '加载中...',
            }
        },
        created() {
            console.log('[this.$route]', this.$route);
            this.getVideoInfo(this.$route.query.id);
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
            getTvId() {
                return getLocalClientId();
            },
            sendPlayMessage(id, vid) {
                let clientId = this.getTvId();
                if (!clientId) {
                    alert('请重新扫码关联设备');
                    return false;
                }
                this.axios.get('/api/video/airplay', {
                    params: {
                        id: id,
                        vid: vid,
                        'client_id': this.getTvId(),
                    }
                }).then((response) => {
                    console.log('[sendPlayMessage.response]', response.data);

                    if (response.data['code'] === 200) {
                      this.axios.get('/api/video/controls', {
                        params: {
                          client_id: clientId,
                          control: 'fullscreen',
                          value: '',
                        }
                      }).then((response) => {
                        console.log('[sendPlayControlsMessage.response]', response.data);
                      });
                      this.axios.get('/api/video/controls', {
                        params: {
                          client_id: clientId,
                          control: 'show_info',
                          value: '',
                        }
                      }).then((response) => {
                        console.log('[sendPlayControlsMessage.response]', response.data);
                      });

                      this.$router.push({name: 'mobile-remote-control',}).then(failure => {
                        if (failure) {
                          console.log('[failure]', failure)
                        }
                      });
                    }

                    alert(response.data['msg'] ?? '未知错误');
                });
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
        /*// 130∶193*/
        /*x/200=193/130*/
        /*193/130*200*/
        /*    width: 200px;*/
        /*    height: 297px;*/
        width: 260px;
        height: 386px;

        border-radius: 8px;
    }

    .info {
        padding: 0 20px 0 20px;
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

    .tv_id_info {
        padding: 0 22px 0 22px;
    }
    .no-video-list {
      margin-top: 200px;
    }
</style>
