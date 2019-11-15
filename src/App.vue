<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>


import MainTabBar from "./components/content/mainTabbar/MainTabBar";
export default {
  name: 'app',
  components: {
      MainTabBar

  },
    mounted() {
        /**
         * 解决 css 引入图片在 github pages 无法获取的问题
         */
        const { NODE_ENV } = process.env;
        document.documentElement.className = NODE_ENV;
    }
}
</script>

<style>
    @import "assets/css/base.css";
</style>
