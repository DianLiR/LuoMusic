<template>
  <div class="sticky py-1 top-0 bg-gray-200 z-50">
    <header class="header text-xs flex justify-between items-center px-1">
      <!-- <font-awesome-icon far icon="bars" size="xs" /> -->
      <!-- <span class="iconfont icon-quanbu_huaban"></span> -->
      <span class="text-qs">{{ name }}</span>
      <van-search
        :placeholder="search_default.showKeyword"
        class="rounded-lg overflow-hidden"
        style="padding:0"
        @click="
          $router.push({
            name: 'search'
          })
        "
      />
      <!-- <span class="iconfont icon-sousuo "></span> -->
      <!-- <font-awesome-icon far icon="search" size="xs" /> -->
    </header>
  </div>
</template>

<script>
export default {
  name: 'headerNav',
  data() {
    return {
      search_default: ''
    }
  },
  created() {
    this.axios({
      url: '/search/default'
    }).then((res) => {
      // console.log('🚀 ~ res', res)
      this.search_default = res.data
    })
  },
  //TODO 头部模块,
  computed: {
    // 直接当做普通属性调用不加括号
    // 任何data中数据变化立即重新计算
    // 计算属性会缓存
    name() {
      /* switch (expression) {
        case expression:

          break;
        default:

      } */
      var name = ''
      // console.log(this.$route.name)
      // return 'a'
      // let name = this.$route.name
      switch (this.$route.name) {
        case 'hot':
          name = '热门歌单'
          break
        case 'home':
          name = '音乐馆'
          break
        case 'friends':
          name = '热门歌手'
          break
        case 'user':
          name = '用户'
          break
        case 'video':
          name = '热门视频'
          break
      }
      return name
      /*  let name = '音乐馆'
      if (this.$route.path == '/hot') {
        name = '热门歌单'
      } else if (this.$route.path == '/friends') {
        name = '热门歌手'
      }
      return name */
    }
  }
}
</script>

<style lang="less" scoped></style>
