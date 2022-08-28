<template>
    <div class="q-mt-md"></div>
    <div class="row header w1200">
        <div class="col-sm-3 logo">
            <router-link to="/mobile">TΞSLA TV</router-link>
        </div>
        <div class="col-sm-6 links">
            <router-link to="/about">关于</router-link>
        </div>
        <div class="col-sm-3">
            <q-input v-model="searchText" placeholder="搜索...">
                <template v-slot:append>
                    <q-icon class="search" name="search" v-on:click="searchVideo"/>
                </template>
            </q-input>
        </div>
    </div>
    <div class="q-mb-lg"></div>
    <div class="fm">
        <!-- $route.fullPath 防止多次进入同一个地址，不会重新加载问题 -->
        <router-view :key="$route.fullPath" class="w1200"></router-view>
    </div>
    <div class="q-my-md flex-center text-center text-grey-8">
        本站资源均网络搜集，如有视频侵犯了您的权益，请联系邮箱(189 1248 0313#qq.com)，确认后，我们会尽快删除！
    </div>

</template>

<script>
    export default {
        data() {
            return {
                searchText: '',
            }
        },
        mounted() {
            this.searchText = this.$route.query['q'];
        },
        methods: {
            searchVideo() {
                this.$router.push({
                    path: '/mobile/video/list',
                    query: {
                        q: this.searchText,
                        p: 1,
                        t: new Date().getTime(),
                    }
                }).then(failure => {
                    if (failure) {
                        console.log('[failure]', failure)
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .w1200 {
        margin: 0 auto;
    }

    .fm {
        min-height: 560px;
    }

    .header {
        line-height: 56px;
        padding: 0 15px 0 15px;
    }

    .header a {
        text-decoration: none;

    }

    .header .logo {
        font-size: 26px;
    }

    .header .logo a {
        color: #171a20;
    }

    .header .links a {
        padding: 0 10px 0 10px;
        display: inline-block;
        color: rgb(51, 51, 51);
        font-size: 16px;
    }

    .header .links .router-link-active {
        text-decoration: underline;
        font-weight: bold;
        color: #000000;
    }

    .search {
        cursor: pointer;
    }

</style>