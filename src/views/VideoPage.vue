<template>
  <!-- <div name="video_page" class="px-1 pt-1"> -->
  <!--    <van-cell-group>
      <van-cell title="单元格" value="内容" />
    </van-cell-group> -->
  <van-tabs v-model="active" sticky @change="pause_all()">
    <van-tab
      :name="name"
      :title="name"
      class="px-1"
      v-for="(item, name, i) in mv_data"
      :key="i"
    >
      <template v-for="(v, k) in item">
        <!-- <span :key="k">{{ v.name }}</span> -->
        <div
          v-if="active == name"
          :key="k"
          class="mv_center flex border relative border-gray-400 flex-col my-1 box-border"
        >
          <!-- border-blue-500 -->
          <!-- <div
            class="relative"
            v-show="play_index != k"
            @click="get_url_show_video(k, v.id, active)"
          >
          </div>
            <img :src="v.cover" width="100%" class="m-auto" />
          <div v-show="play_index == k" @click="play_mv"> -->
          <!-- <div v-if="play_index == k" @click="play_mv"> -->
          <div class="relative w-full">
            <!-- <span
              style="font-size:1.2rem"
              class="absolute iconfont  text-white icon-bofang_huaban1 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            ></span> -->
            <span
              v-if="play_index != k"
              style="font-size: 1.2rem"
              class="absolute iconfont text-white icon-bofang_huaban1 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            ></span>
            <video
              ref="video"
              :src="v.url"
              preload="metadata"
              :poster="v.cover"
              :data-v_index="k"
              @click="play_mv($event, v.id, k)"
            ></video>
          </div>
          <!-- </div> -->
          <div class="flex flex-wrap text-xs py-0.5">
            <p class="text-tiny_2l w-11/12 truncate">
              {{ v.name }}
            </p>
            <p class="text-tiny_1l">{{ v.briefDesc }}</p>
          </div>
          <span class="iconfont icon-bofang_huaban" style="font-size: 0.1rem">
            {{ v.playCount | playCount }}
          </span>
        </div>
      </template>
      <!--  <template v-for="(item, index) in mv_data">
          <span :key="index">
            {{ val.name + '--' + item }}
            {{ item }}
          </span>
        </template> -->
    </van-tab>
  </van-tabs>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'Video',
  beforeRouteEnter(to, from, next) {
    // ...
    next((vm) => {
      console.log('🚀 ~ 切换播放状态')
      vm.$store.commit('toggle_is_play', false)
      vm.$store.commit('set_music_data', '')
    })
  },
  data() {
    return {
      play_index: null,
      play_active: null,
      active: '官方版',
      type: ['官方版', '原生', '现场版', '网易出品'],
      mv_data: {}
    }
  },
  created() {
    // this.$nextTick(() => {
    this.type.forEach((item) => {
      this.get_mv_all(item)
    })
    // })
  },
  watch: {
    // active: function() {
    //   this.get_mv_all()
    // }
  },
  methods: {
    /*  canplay(event) {
      event.target.play()
    }, */
    // get_url_show_video(index, id, a) {
    //   console.log(a)
    //   console.log(this.$refs)
    //   this.play_index = index
    //   this.get_mv_url(id)
    // },
    pause_all() {
      // console.log('111')
      // console.log(this.$refs.video)
      this.play_index = null
      for (var i = 0; i < this.$refs.video.length; i++) {
        this.$refs.video[i].pause()
      }
    },
    play_mv(event, id, index) {
      this.get_mv_url(id)

      // console.log('🚀 ~ index', index)
      let i = event.target.dataset.v_index

      if (i == this.play_index) {
        console.log('test')
        let flag = event.target.paused
        if (flag) {
          console.log('play')
          event.target.play()
        } else {
          console.log('pause')
          event.target.pause()
        }
      } else {
        this.pause_all()
        event.target.play()
      }
      this.play_index = index
      /*
      console.log(
        '🚀 ~  event.target.dataset.v_index',
        event.target.dataset.v_index
      ) */

      /*

      if (index == this.index || this.index == null) {
        let flag = event.target.paused
        if (flag) {
          console.log('play')
          event.target.play()
        } else {
          console.log('pause')
          event.target.pause()
        }
      } else {
        this.pause_all()
        event.target.play()
      }
 */
      // this.play_index = null
      // this.get_mv_url(id)
      // this.get_mv_url(id)
      // this.$refs['video' + this.play_index][0].pause()
      // this.play_index = null
      // e.target.play()
      // console.log(e, i)
    },
    async get_mv_all(v) {
      //获取全部MV
      /**
       ** area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
       ** type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
       ** order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
       ** limit: 取出数量 , 默认为 30
       ** offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
       ** 接口地址 : /mv/all
       */
      // console.log(v)
      let limit = 5
      let type = v ? v : this.active
      // console.log(type)
      await this.axios({
        url: '/mv/all',
        params: {
          type,
          // area: '',
          order: '最热',
          limit,
          offset: 0
        }
      }).then((res) => {
        // console.log(res)
        this.$set(this.mv_data, type, res.data)
        // for (let i = 0; i < this.mv_data[v].length; i++) {
        //   let id = this.mv_data[v][i].id
        //   this.axios({
        //     url: '/mv/url',
        //     params: {
        //       id
        //     }
        //   }).then((res_url) => {
        //     // console.log(res_url.data.url)
        //     this.$set(this.mv_data[v][i], 'url', res_url.data.url)
        //   })
        // }
      })
    },
    get_mv_url(id) {
      /**
       ** 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
       ** 必选参数 : id: mv id
       ** 可选参数 : r: 分辨率,默认1080,可从 /mv/detail 接口获取分辨率列表
       ** 接口地址 : /mv/url
       ** 调用例子 :
       ** /mv/url?id=5436712 /mv/url?id=10896407&r=1080
       */
      this.axios({
        url: '/mv/url',
        params: {
          id
        }
      }).then((res_url) => {
        // console.log(res_url.data.url)
        // console.log(this.mv_data[this.active][this.play_index])
        this.$set(
          this.mv_data[this.active][this.play_index],
          'url',
          res_url.data.url
        )
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
