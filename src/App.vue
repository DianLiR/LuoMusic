<template>
  <!-- <div
    id="app"
    :class="[
      'max-w-screen-sm m-auto bg-gradient-to-b  from-gray-200',
      $store.state.show_min_play ? '' : 'overflow-hidden w-screen h-screen'
    ]"
  > -->
  <div
    id="app"
    :class="[
      'max-w-screen-sm m-auto bg-gradient-to-b  from-gray-200',
      $store.state.show_min_play ? '' : 'overflow-hidden w-screen h-screen'
    ]"
  >
    <!-- 顶部栏 -->
    <header-nav v-if="!$route.meta.hiddenHeader"></header-nav>

    <!-- 路由出口 -->
    <div name="view">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="pb-12"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <!-- <div
      class="sticky bottom-0"
      v-if="$route.meta.keepAlive && !$route.meta.hiddenHeader"
    > -->
    <min-player
      v-if="
        $store.state.music_play_data.id &&
          $route.name != 'video' &&
          $route.name != 'login'
      "
    />
    <van-tabbar v-model="active" fixed route v-show="$route.meta.show_tab">
      <van-tabbar-item to="/home" name="home" icon="home-o" replace>
        发现
      </van-tabbar-item>
      <van-tabbar-item to="/hot" name="hot" icon="fire-o" replace>
        排行
      </van-tabbar-item>
      <van-tabbar-item to="/user" name="user" icon="user-o">
        我的
      </van-tabbar-item>
      <van-tabbar-item to="/friends" name="friends" icon="friends-o" replace>
        歌手
      </van-tabbar-item>
      <van-tabbar-item to="/video" name="video" icon="video-o" replace>
        视频
      </van-tabbar-item>
    </van-tabbar>
    <!-- </div> -->
  </div>
</template>
<script>
import headerNav from './components/base/headerNav.vue'
import minPlayer from './components/Player/min-Player.vue'
export default {
  data() {
    return {
      active: 'home',
      show_play: true
    }
  },
  components: {
    headerNav,
    minPlayer
  }
}
</script>
<style lang="less">
html,
body,
#app {
  width: 100vw;
}
</style>
