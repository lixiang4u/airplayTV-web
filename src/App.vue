<template>
    <div class="q-mt-md"></div>
    <div class="row header w1200">
        <div class="col-2 logo">
            <router-link to="/">ShotTV</router-link>
        </div>
        <div class="col-6 links">
            <router-link to="/">首页</router-link>
            <router-link to="/qr-index">扫码</router-link>
            <router-link to="/video/list">视频列表</router-link>
            <router-link to="/">GiMY.app</router-link>
        </div>
        <div class="col-4">
            <q-input v-model="searchText" placeholder="搜索...">
                <template v-slot:append>
                    <q-icon name="search" v-on:click="searchVideo"/>
                </template>
            </q-input>
        </div>
    </div>
    <div class="q-mb-lg"></div>
    <router-view class="w1200"></router-view>
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
        methods: {
            searchVideo() {
                console.log('[searchText]', this.searchText);
                // 跳转到视频搜索页面，然后执行查询视频
                // this.$router.push('/video/list');
            }
        }
    }
</script>

<style scoped>
    .w1200 {
        width: 1200px;
        margin: 0 auto;
    }

    .header {
        line-height: 56px;
    }

    .header a {
        text-decoration: none;

    }

    .header .logo {
        font-size: 26px;
    }

    .header .links a {
        padding: 0 10px 0 10px;
        display: inline-block;
        color: rgb(51, 51, 51);
        font-size: 16px;
    }

</style>