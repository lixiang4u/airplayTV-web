<template>
  <div>
    <h1>Home page</h1>
    <router-link to="/">{ / }</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  mounted() {
    console.log('[Home.getClientId]', this.$store.state.clientId);
  }
}
</script>