<template>
    <div class="route">
        <router-link to="/">{ / }</router-link>
        <router-link to="/home">Home</router-link>
        <router-link to="/qr-index">QrIndex</router-link>
        <router-link to="/video/list">VideoList</router-link>
    </div>
    <router-view></router-view>
</template>

<script>
    export default {}
</script>

<style scoped>
    .route a {
        padding: 5px 10px 5px 10px;
    }
</style>