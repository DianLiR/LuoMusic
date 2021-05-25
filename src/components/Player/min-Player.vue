<template>
  <div name="play" class="">
    <audio
      ref="audio"
      :src="
        'https://music.163.com/song/media/outer/url?id=' + play_list.id + '.mp3'
      "
      autoplay
    ></audio>

    <!-- 小播放器 -->
    <div
      name="min_play"
      @click="to_player()"
      v-show="show_play"
      :class="[
        'w-screen h-5 flex justify-between fixed  shadow bg-white',
        $route.meta.show_tab ? 'bottom-5' : 'bottom-0'
      ]"
    >
      <div class="flex">
        <van-image
          :class="[
            'rounded-full p-0.5 ml-1 animate-spin-slow',
            is_play ? 'play' : 'paused'
          ]"
          width="1.3rem"
          height="1.3rem"
          round
          :src="play_list.coverImgUrl"
        />
        <div
          name="info"
          class="text-tiny_2l truncate flex justify-around flex-col w-20 ml-1"
        >
          <span class="truncate">{{ play_list.name }}</span>
          <span class="text-tiny flex">
            <template v-for="(items, index) in play_list.ar">
              <template v-if="index">/</template>
              {{ items.name }}
            </template>
          </span>
        </div>
      </div>

      <div name="controller" class="mr-2 flex items-center">
        <span
          @click.stop="toggle_play()"
          :class="[
            'iconfont mx-1',
            is_play ? 'icon-zanting_huaban1' : 'icon-bofang_huaban1'
          ]"
        ></span>
        <span
          class="iconfont icon-xiayishou_huaban"
          @click.stop="toggle_song(true)"
        ></span>
      </div>
    </div>

    <div
      v-show="!show_play"
      name="player"
      class="fixed w-screen flex flex-col justify-between h-screen top-0 left-0 z-50 bg-white"
    >
      <van-nav-bar
        class="bg-transparent z-20"
        left-arrow
        ref="van_nav_bar"
        @click-left="$store.commit('toggle_show_minplay', !show_play)"
      >
        <template #title>
          <div class="flex flex-col items-center">
            <span class="text-qs">{{ play_list.name }}</span>

            <span class="text-tiny flex">
              <template v-for="(items, index) in play_list.ar">
                <template v-if="index">/</template>
                {{ items.name }}
              </template>
            </span>
          </div>
        </template>
      </van-nav-bar>
      <div
        @click="toggle_lyric = !toggle_lyric"
        name="cent"
        class="flex items-center justify-center h-44 overflow-hidden"
      >
        <div
          name="cove"
          class="flex items-center justify-center"
          v-show="!toggle_lyric"
        >
          <div
            style="width: 5rem; height: 5rem"
            :class="[
              'absolute border-2 border-blue-200 rounded-full animate-ping-slow',
              is_play ? 'play' : 'paused'
            ]"
          ></div>
          <van-image
            width="6rem"
            :class="[
              'animate-spin-slow border-8 box-content border-gray-700',
              is_play ? 'play' : 'paused'
            ]"
            height="6rem"
            round
            :src="play_list.coverImgUrl"
          />
        </div>
        <div name="lyric" class="w-full h-44 relative" v-show="toggle_lyric">
          <div
            v-if="lyric == ''"
            class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            暂无歌词
          </div>
          <ul class="absolute w-full left-0">
            <li
              v-for="(item, i) in lyric"
              :key="i"
              :class="[
                'w-full text-gray-500 text-center h-4 leading-tight text-tiny_1l',
                { 'text-yellow-50 text-qs': currentRow === i }
              ]"
            >
              {{ item.text }}
            </li>
          </ul>
        </div>
      </div>
      <div class="h-16 flex justify-around flex-col px-2">
        <!-- <div name="features" class="flex justify-around">
          <span class="iconfont icon-xihuan_huaban"></span>
          <span class="iconfont icon-xiaoxi_huaban"></span>
        </div> -->
        <div
          name="progressBar"
          class="flex items-center justify-around text-tiny"
        >
          <!--//! 进度条 -->
          <span name="time_left" class="px-1">
            {{ currentTime | TimeFormatting }}
          </span>
          <!--//! 滑块 -->
          <van-slider
            :value="currentTime"
            :max="duration"
            :step="1"
            :min="0"
            button-size=".4rem"
            @change="change_value"
          />
          <!--//! 时间 -->
          <span name="time_left" class="px-1">
            {{ duration | TimeFormatting }}
          </span>
        </div>
        <div name="controller" class="flex justify-around items-center">
          <span
            @click="play_type = !play_type"
            :class="[
              'iconfont',
              play_type ? 'icon-zhongzuo_huaban' : ' icon-hanhan-01-012'
            ]"
          ></span>
          <span
            class="iconfont icon-shangyishou_huaban"
            @click="toggle_song(false)"
          ></span>
          <span
            style="font-size: 1rem"
            :class="[
              'iconfont',
              is_play ? 'icon-zanting_huaban' : 'icon-bofang_huaban'
            ]"
            @click.stop="toggle_play()"
          ></span>
          <span
            class="iconfont icon-xiayishou_huaban"
            @click="toggle_song(true)"
          ></span>

          <van-popover
            v-model="showPopover"
            placement="top-end"
            trigger="click"
          >
            <div class="h-36 w-24 overflow-y-auto">
              <van-list>
                <van-cell
                  @click="list_to_play(item, i)"
                  v-for="(item, i) in play_list.tracks"
                  :key="i"
                  class="flex items-center"
                >
                  <template #title>
                    <span class="w-16 block truncate">{{ item.name }}</span>
                  </template>
                  <template #right-icon>
                    <van-icon name="checked" v-if="i == play_index" />
                  </template>
                </van-cell>
              </van-list>
            </div>

            <template #reference>
              <span class="iconfont icon-caidan"></span>
            </template>
          </van-popover>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'minPlayer',
  data() {
    return {
      showPopover: false,
      toggle_lyric: false,
      lyric: [],
      currentRow: 0,
      // slider_value: 0,
      currentTime: 0,
      duration: 0,
      play_type: true //true为默认列表播放  false为随机播放
    }
  },
  computed: mapState({
    show_play(state) {
      return state.show_min_play
    },
    play_list(state) {
      return state.music_play_data
    },
    is_play(state) {
      return state.is_play
    },
    play_index() {
      return this.play_list.tracks.findIndex((item) => {
        return item.id == this.play_list.id
      })
    }
  }),
  watch: {
    '$store.state.is_play': function () {
      if (this.$store.state.is_play) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    }
  },

  mounted() {
    let audio = this.$refs.audio
    audio.addEventListener('durationchange', () => {
      // console.log(this.play_list.lyric)
      //音乐变更格式化歌词
      // this.formatLyric(this.play_list.lyric)
      this.get_lyric_data()
      // console.log(audio.duration)
      this.duration = Number(audio.duration)
    }),
      audio.addEventListener('ended', () => {
        // console.log('test')
        this.toggle_song(true)
      }),
      audio.addEventListener('timeupdate', () => {
        // console.log('test')
        // console.dir(audio)
        this.currentTime = Number(audio.currentTime)
      })
    audio.addEventListener('play', () => {
      // console.log('test')

      console.log('🚀 ~ 切换播放状态_play')
      this.$store.commit('toggle_is_play', true)
      this.$refs.audio.play()
    })
  },
  filters: {
    TimeFormatting(v) {
      let m = parseInt(v / 60)
      let s = parseInt(v % 60)
      s = s < 10 ? '0' + s : s
      if (m == 0 && s == 0) {
        return '0:00'
      } else {
        return m + ':' + s
      }
    }
  },
  methods: {
    list_to_play(item, i) {
      console.log(item, i)
      let coverImgUrl = item.al
        ? item.al.picUrl
        : item.album.blurPicUrl
        ? item.album.blurPicUrl
        : item.album.picUrl
        ? item.album.picUrl
        : item.album.artist.img1v1Url
        ? item.album.artist.img1v1Url
        : item.album.picUrl
      this.$store.commit('set_music_data', {
        ...this.play_list,
        id: item.id,
        name: item.name,
        ar: item.ar,
        coverImgUrl
      })
    },
    change_value(e) {
      console.log(e)
      // 拖动进度条 修改进度
      this.$refs.audio.currentTime = this.currentTime = e
    },
    to_player() {
      // 切换大播放器
      if (this.play_list.id != null) {
        this.$store.commit('toggle_show_minplay', !this.show_play)
      }
    },
    toggle_play() {
      console.log('🚀 ~ 切换播放状态')

      //切换播放状态
      if (this.play_list.id && this.is_play) {
        // if (this.is_play) {
        this.$store.commit('toggle_is_play', false)
        // this.$refs.audio.pause()
      } else {
        this.$store.commit('toggle_is_play', true)
        // this.$refs.audio.play()
      }
      // }
    },
    get_lyric_data() {
      this.axios({
        url: '/lyric',
        params: {
          id: this.play_list.id
        }
      }).then((res) => {
        this.formatLyric(res.lrc.lyric)
      })
    },
    formatLyric(text) {
      //歌词格式化
      this.lyric = []
      let arr = text.split('\n') //字符串分割为数组
      for (let i = 0; i < arr.length; i++) {
        let temp_value = arr[i].split(']') //分割 1:时间 2:文本
        // let temp_arr = temp_value.split(']')
        let text = temp_value.pop() //删除最后的空白
        temp_value.forEach((item) => {
          let obj = {}
          let time_arr = item.substring(1, item.length - 1).split(':') //切割时间
          let s = parseInt(time_arr[0] * 60 + Math.ceil(time_arr[1])) //获取歌词时间戳
          obj.time = s
          obj.text = text
          // if (text.length > 0) {
          this.lyric.push(obj)
          // }
        })
      }
    },
    toggle_song(flag) {
      let { id, tracks } = this.play_list
      let i
      //控制切换上下
      if (this.play_type) {
        i = tracks.findIndex((item) => {
          // 根据id获取所有歌曲当前下标
          return item.id == id
        })

        if (flag) {
          i = i + 1 > tracks.length - 1 ? 0 : i + 1 //下一曲
        } else {
          i = i - 1 < 0 ? tracks.length - 1 : i - 1 //上一曲
        }
      } else {
        i = parseInt(Math.random() * this.play_list.tracks.length)
      }
      // this.currentTime = 0
      // let ar = tracks[i].ar || tracks[i].artists
      let ar = tracks[i].ar ? tracks[i].ar : tracks[i].artists
      // let coverImgUrl = tracks[i].al.picUrl || tracks[i].album.blurPicUrl
      let coverImgUrl = tracks[i].al
        ? tracks[i].al.picUrl
        : tracks[i].album.blurPicUrl
        ? tracks[i].album.blurPicUrl
        : tracks[i].album.picUrl
        ? tracks[i].album.picUrl
        : tracks[i].album.artist.img1v1Url
        ? tracks[i].album.artist.img1v1Url
        : tracks[i].album.picUrl
      this.$store.commit('set_music_data', {
        id: tracks[i].id,
        name: tracks[i].name,
        ar,
        tracks,
        coverImgUrl
      })
    }
    // toggle_up() {
    //   let { id, tracks } = this.play_list
    //   let i = tracks.findIndex((item) => {
    //     // 根据id获取所有歌曲当前下标
    //     return item.id == id
    //   })
    //   i = i + 1 > tracks.length - 1 ? 0 : i + 1 //如果当前为最后一首则更改为第一首
    //   this.$store.commit('set_music_data', {
    //     id: tracks[i].id,
    //     name: tracks[i].name,
    //     ar: tracks[i].ar,
    //     tracks,
    //     coverImgUrl: tracks[i].album.blurPicUrl
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 0.8rem;
}
.paused {
  animation-play-state: paused;
}
.play {
  animation-play-state: running;
}
</style>
