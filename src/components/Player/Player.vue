<template>
  <div name="player" class="flex flex-col justify-between h-screen ">
    <audio :src="play_list.url" autoplay></audio>
    <van-nav-bar
      class="bg-transparent  z-20"
      left-arrow
      ref="van_nav_bar"
      @click-left="$router.back()"
    >
      <template #title>
        <div class="flex flex-col ">
          <span class="text-qs ">{{ play_list.name }}</span>
          <!-- <span class="text-tiny">{{ play_list.ar[0].name }}</span> -->
          <span
            class="text-tiny"
            v-for="(items, index) in play_list.ar"
            :key="index"
          >
            <template v-if="index">/</template>
            {{ items.name }}
          </span>
        </div>
      </template>
    </van-nav-bar>
    <!-- <span>{{ play_list }}</span> -->
    <div
      @click="toggle_lyric = !toggle_lyric"
      name="cent"
      class="flex items-center justify-center h-44  overflow-hidden"
    >
      <!-- <template v-if="toggle_lyric"> -->
      <div
        name="cove"
        class="flex items-center justify-center"
        v-show="toggle_lyric"
      >
        <div
          style="width: 5rem;height: 5rem;"
          class="absolute border-2 border-blue-200 rounded-full animate-ping-slow "
        ></div>
        <van-image
          width="6rem"
          class="animate-spin-slow border-8 box-content border-gray-700"
          lazy-load
          height="6rem"
          show-loading
          round
          :src="play_list.coverImgUrl"
        />
      </div>
      <!-- </template> -->
      <!-- <template v-if="!toggle_lyric"> -->
      <div name="lyric" class="w-full h-72 relative" v-show="!toggle_lyric">
        <ul class="absolute w-full top-32 left-0">
          <!-- <li
            v-for="(item, i) in lyric"
            :key="i"
            :class="[
              'w-full text-gray-500 text-center h-4 leading-tight text-tiny_1l',
              { 'text-yellow-50 text-qs': currentRow === index }
            ]"
          >
            {{ item.text }}
          </li> -->
        </ul>
      </div>
      <!-- </template> -->
    </div>
    <div class="h-16 flex justify-around flex-col">
      <div name="features" class="flex justify-around">
        <span class="iconfont icon-xihuan_huaban"></span>
        <span class="iconfont icon-xiaoxi_huaban"></span>
      </div>
      <div name="progressBar" class="flex items-center text-tiny">
        <span name="time_left" class="mr-1">00:00</span>
        <van-slider v-model="slider_value" button-size=".4rem" />
        <span name="time_left" class="ml-1">00:00</span>
      </div>
      <div name="controller" class="flex justify-around items-center">
        <span class="iconfont icon-zhongzuo_huaban"></span>
        <span class="iconfont icon-shangyishou_huaban "></span>
        <span
          style="font-size:30px"
          class="iconfont icon-zanting_huaban"
        ></span>
        <span class="iconfont  icon-xiayishou_huaban"></span>
        <span class="iconfont  icon-caidan"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Player',
  data() {
    return {
      toggle_lyric: false,
      lyric: [],
      currentRow: 0,
      slider_value: 0
    }
  },
  created() {
    // this.get_song_lyric()
  },
  watch: {
    play_list: {
      handler(n, o) {
        this.formatLyric(n.lyric || o.lyric)
      },
      deep: true
    }
  },
  computed: {
    play_list() {
      return this.$store.state.music_play_data
    }
  },
  methods: {
    formatLyric(text) {
      this.lyric = []
      let arr = text.split('\n') //字符串分割为数组
      for (let i = 0; i < arr.length; i++) {
        let temp_value = arr[i].split(']') //分割 1:时间 2:文本
        // console.log('🚀 ~ temp_value', temp_value)
        // let temp_arr = temp_value.split(']')
        let text = temp_value.pop() //删除最后的空白
        temp_value.forEach((item) => {
          let obj = {}
          let time_arr = item.substring(1, item.length - 1).split(':') //切割时间
          // console.log('🚀 ~ time_arr', time_arr)
          let s = parseInt(time_arr[0] * 60 + Math.ceil(time_arr[1])) //获取歌词时间戳
          obj.time = s
          obj.text = text
          if (text.length > 0) {
            this.lyric.push(obj)
          }
        })
      }
    }
    // get_song_lyric(id) {
    //   console.log('🚀 ~ id', id)
    //   this.axios({
    //     url: '/lyric',
    //     id: '33894312'
    //   }).then((res) => {
    //     console.log('🚀 ~ res', res)
    //     // this.format_Lyric(res.lrc.lyric)
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 0.8rem;
}
</style>
