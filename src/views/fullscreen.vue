<template>
  <div></div>
</template>

<script>
import {getCurrentSiteHost} from './../helper/url-helper';

export default {
  name: 'FullscreenComponent',
  created() {
    window.location.href = "https://v.qq.com/search_redirect.html?url=https://www.baomihua.com/go.aspx?url=https://" + getCurrentSiteHost() + "?baomihua.com=" + new Date().getTime()
  }
}
</script>