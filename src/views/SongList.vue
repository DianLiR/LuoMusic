<template>
  <div v-if="flag"></div>
  <div v-else class="song_list relative mb-6" id="box">
    <van-nav-bar
      fixed
      title="歌单"
      left-text="返回"
      :style="{
        'background-color': backgroundColor
      }"
      :border="false"
      left-arrow
      ref="van_nav_bar"
      @click-left="$router.back()"
    />

    <div class="relative h-28 rounded-b-sm overflow-hidden">
      <!-- 背景 -->
      <div
        class="list_bg bg-top-5"
        :style="{ backgroundImage: 'url(' + play_list.coverImgUrl + ')' }"
      ></div>
      <!-- 信息版图 -->
      <div class="absolute px-2 py-8 flex items-center">
        <div>
          <!-- 歌单封面 -->
          <van-image :src="play_list.coverImgUrl" width="120" class="v_img" />
        </div>

        <div class="ml-2 text-white flex h-12 flex-col justify-between">
          <!-- 歌单名称 -->
          <h2 class="text-qs van-multi-ellipsis--l2">{{ play_list.name }}</h2>
          <div class="creator flex items-center" v-if="play_list">
            <!-- 创建者头像 -->
            <van-image
              width="25"
              round
              lazy-load
              show-loading
              fit="cover"
              :src="play_list.creator.avatarUrl"
            />
            <span class="ml-1 text-tiny text-gray-400">
              <!-- 作者名称 -->
              {{ play_list.creator.nickname }}
            </span>
          </div>

          <div class="text-tiny w-20 relative">
            <span class="truncate block w-20" @click="show = true">
              描述信息
              {{ play_list.description }}
            </span>
            <!--展示弹出层-->
            <van-overlay :show="show" @click="show = false">
              <div
                class="flex items-center justify-center h-full bg-gray-400 bg-opacity-90"
              >
                <div class="w-4/5 h-4/5 text-white flex items-center flex-col">
                  <div class="flex items-center flex-col">
                    <van-image
                      width="200"
                      :src="play_list.coverImgUrl"
                      class="rounded-md overflow-hidden"
                    />
                    <h2 class="mt-1">{{ play_list.name }}</h2>
                  </div>
                  <div class="w-3/4 mt-2">
                    <div v-if="play_list.tags != ''" class="flex items-center">
                      标签:
                      <van-tag
                        class="mx-0.5"
                        round
                        type="primary"
                        v-for="(item, i) in play_list.tags"
                        :key="i"
                      >
                        {{ item }}
                      </van-tag>
                    </div>
                    <div class="h-28 overflow-hidden mt-1">
                      <p
                        class="break-all whitespace-pre-wrap h-full leading-tight"
                      >
                        {{ play_list.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </van-overlay>
            <!-- <van-popover
              v-model="showPopover"
              trigger="click"
              placement="bottom"
            >
              <template #default>
                <p class="text-tiny p-1 w-20">{{ play_list.description }}</p>
              </template>
              <template #reference>
                <span class="truncate block w-20">
                  描述信息
                  {{ play_list.description }}
                </span>
              </template>
            </van-popover> -->
          </div>
        </div>
      </div>
      <!-- 其它功能 -->
      <div
        class="w-24 px-1 shadow-lg box-content text-center rounded-full flex items-center h-4 bg-white absolute bottom-1 left-2/4 transform -translate-x-2/4 text-tiny_1l"
      >
        <div class="flex flex-1 items-center justify-center h-full">
          <van-icon name="like-o" size="1em" />
          <span>
            {{ play_list.subscribedCount | playCount }}
          </span>
        </div>
        <div class="flex flex-1 items-center justify-center h-full">
          <van-icon name="chat-o" size="1em" />
          <span>
            {{ play_list.commentCount | playCount }}
          </span>
        </div>
        <div class="flex flex-1 items-center justify-center h-full">
          <van-icon name="share-o" size="1em" />
          <span>
            {{ play_list.shareCount | playCount }}
          </span>
        </div>
      </div>
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, i) in list"
        :key="item.id"
        @click="to_play(item, list)"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="flex items-center">
            <p :class="[{ 'text-red-500': i < 3 }, 'w-2']">
              {{ i + 1 }}
            </p>
            <div class="flex flex-col ml-1">
              <span class="w-28 truncate">
                {{ item.name }}
              </span>
              <span class="text-tiny van-ellipsis w-20">
                <template v-for="(val, i_s) in item.ar">
                  <template v-if="i_s">/</template>
                  {{ val.name }}
                </template>
              </span>
            </div>
          </div>
        </template>
      </van-cell>

      <!-- <van-cell title="单元格" icon="shop-o"> -->
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <!-- <template #right-icon> -->
      <!-- <van-icon name="search" class="search-icon" /> -->
      <!-- </template> -->
      <!-- </van-cell> -->
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'song_list',
  data() {
    return {
      flag: true,
      show: false,
      play_list: '',
      list: [],
      loading: false,
      finished: false,
      tracksIds: [],
      tab_num: 0,
      backgroundColor: 'transparent',
      scrollTop: 0,
      tracksIds_length: 0
    }
  },
  created() {
    this.get_detail()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    to_play(v, s) {
      // console.log(v, a)
      let data = {
        id: v.id,
        name: v.name,
        ar: v.ar,
        tracks: s,
        coverImgUrl: v.al.picUrl
      }
      this.$store.dispatch('set_music_data', data)
    },
    handleScroll() {
      // let ele = this.$refs.van_nav_bar.$el
      // let scrollTop =
      //   window.pageYOffset ||
      //   document.documentElement.scrollTop ||
      //   document.body.scrollTop
      // console.log('🚀 ~ scrollTop', scrollTop * 5)

      // if (scrollTop <= 255) {
      //   console.log('11')
      //   // this.$refs.van_nav_bar.$el.style.backgroundColor =
      //   //   'rgba(255 255 255 /' + scrollTop * 1.15 + '%)'
      //   //  background-color: rgba(255 255 255 / 100%);
      //   this.$refs.van_nav_bar.$el.style.cssText = `
      //  background-color:rgba(255, 255, 255,${scrollTop}%)
      //   `
      // }
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      let offsetTop = document.querySelector('#box').offsetTop
      // console.log(scrollTop, offsetTop)
      this.scrollTop = scrollTop
      //设置背景颜色的透明读
      if (offsetTop <= scrollTop) {
        this.backgroundColor = `rgba(255, 255, 255,${
          scrollTop / (scrollTop + 25)
        })`
      } else if (scrollTop == 0) {
        this.backgroundColor = 'transparent'
      }
    },

    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.axios({
          url: '/song/detail',
          params: {
            ids: this.tracksIds.splice(0, 10).join()
          }
        }).then((res) => {
          this.list.push(...res.songs)
        })
        // 加载状态结束
        this.loading = false
        console.log(this.list.length, this.tracksIds.length)
        // 数据全部加载完成
        // this.$nextTick(() => {
        if (this.list.length >= this.tracksIds_length) {
          this.finished = true
        }
        // })
      }, 1000)
    },

    get_detail() {
      // 获取路由传递的id 使用id获取歌单信息
      let id = this.$route.params.id
      console.log('🚀 ~ id', id)
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay: true,
        duration: 0
      })
      if (!id) return
      this.axios({
        url: 'playlist/detail',
        params: {
          id
        }
      }).then((res) => {
        this.flag = false
        this.$toast.clear()
        this.play_list = res.playlist
        this.list = res.playlist.tracks
        // console.log(res.playlist)
        //   for (let index = 0; index < res.playlist.trackIds.length; index++) {
        // const element = array[index];
        // console.log(index)
        // }
        res.playlist.trackIds.forEach((item) => {
          // console.log(item.id)
          this.tracksIds.push(item.id)
        })
        this.tracksIds.splice(0, 10)
        this.tracksIds_length = this.tracksIds.length + 10
        // console.log(res.playlist)

        // console.log(this.tracksIds.splice(1, 10).join())
        // console.log(this.tracksIds)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list_bg {
  @apply w-full h-full scale-150 p-4 bg-no-repeat filter blur-lg bg-cover absolute transform;
  &::after {
    content: '';
    display: block;
    height: 80%;
    background-color: #53494910;
  }
}
.v_img {
  @apply relative rounded-md overflow-hidden shadow;
}
/deep/ .van-nav-bar {
  // color: white;
  background-color: rgba(255, 255, 255, 0);
}
</style>
