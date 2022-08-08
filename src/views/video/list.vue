<template>
    <div>VideoList</div>
    <button @click="getVideoList">GetVideoList</button>

    <div class="video-list">
        <div v-for="(v,idx) in videoList" :key="idx">
           {{idx}}、{{ v.name }}
        </div>
    </div>

</template>

<script>
    export default {
        name: 'VideoList',
        data() {
            return {
                videoList: null
            }
        },
        created() {
            // this.getVideoList();
        },
        methods: {
            getVideoList() {
                console.log('[this.videoList]', this.videoList);

                this.axios.get('http://127.0.0.1:8089/api/tag').then((response) => {
                    console.log('[getVideoList.response]', response.data);
                    this.videoList = response.data['list']
                });
            }
        }
    }

</script>

