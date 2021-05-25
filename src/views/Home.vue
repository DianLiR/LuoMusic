<template>
  <div class="home p-1">
    <!--//* 首页轮播图 -->
    <div class="banner">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="item in banners" :key="item.bannerId">
          <div class="relative">
            <van-image
              show-loading
              :src="item.pic"
              width="100%"
              height="3.94rem"
              fit="cover"
              class="rounded-md overflow-hidden"
            />
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!--//! 推荐歌单 ↓ -->
    <slidingplate
      title_name="推荐歌单"
      :swiper_data="personalized"
      @go_song_list="go_song_list"
    ></slidingplate>
    <!-- 新歌速递 -->
    <!-- <van-cell-group>
      <van-cell value="内容" size="large">
        <template #title>
          <van-image
            width="60"
            height="60"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </template>
      </van-cell>
    </van-cell-group> -->
    <!-- <van-tabs
      v-model="active"
      swipeable
      animated
      class="mt-1 rounded-sm bg-white"
    >
      <van-tab title="全部" name="全部">
        内容1
      </van-tab>
      <van-tab title="华语" name="华语">
        内容2
      </van-tab>
      <van-tab title="欧美" name="欧美">
        内容3
      </van-tab>
    </van-tabs> -->

    <!--//! 新歌 -->
    <van-tabs
      class="mt-1 rounded-md overflow-hidden bg-white"
      swipeable
      v-model="active"
      animated
    >
      <van-tab
        v-for="(item, index) in new_song_type"
        :title="item.name"
        :key="item.type"
      >
        <van-cell-group v-if="isSHow">
          <van-cell
            size="large"
            v-for="(item_s, k) in new_song_list[index]"
            :key="k"
            @click="play_music(item_s, new_song_list[index])"
          >
            <template #title>
              <div class="left flex items-center">
                <van-image
                  width="60"
                  height="60"
                  class="rounded-sm overflow-hidden"
                  :src="item_s.album.picUrl"
                  fit="cover"
                  show-loading
                  lazy-load
                />
                <p class="flex flex-col ml-1">
                  <span class="van-ellipsis w-20">
                    {{ item_s.name }}
                  </span>

                  <span class="text-tiny van-ellipsis w-20">
                    <template v-for="(val, index) in item_s.artists">
                      <template v-if="index">/</template>
                      {{ val.name }}
                    </template>
                    - {{ item_s.album.name }}
                  </span>
                </p>
              </div>
            </template>
          </van-cell>
          <!-- <p class="text-center text-qs">查看更多</p> -->
        </van-cell-group>
        <!-- <template  > -->
        <template #default v-if="!isSHow">
          <div class="relative w-full h-40">
            <p
              class="blink"
              style="z-index: 0;border-radius: 0% / 0%;background: rgb(239, 239, 239);width: 95%;margin-top: 0%;"
            ></p>
            <p
              class="blink"
              style="z-index: 1;border-radius: 3.947% / 4.185%;background: rgb(255, 255, 255);width: 95%;padding-bottom: 89.6%;left: 2.5%;"
            ></p>
            <p
              class="blink"
              style="z-index: 2;border-radius: 0% / 0%;background: rgb(255, 255, 255);width: 95%;padding-bottom: 89.6%;left: 2.5%;"
            ></p>
            <p
              class="blink"
              style="z-index: 3;border-radius: 0% / 0%;background: rgb(255, 255, 255);width: 95%;padding-bottom: 22.4%;left: 2.5%;"
            ></p>
            <p
              class="blink"
              style="z-index: 4;background: #EEEEEE;width: 50%;padding-bottom: 4.267%;left: 22.767%;margin-top: 10.867%;"
            ></p>
            <p
              class="blink"
              style="z-index: 5;border-radius: 0% / 0%;background: rgb(239, 239, 239);width: 16%;padding-bottom: 16%;left: 6.767%;margin-top: 8.2%;"
            ></p>
            <p
              class="blink"
              style="z-index: 6;border-radius: 0% / 0%;background: rgb(255, 255, 255);width: 95%;padding-bottom: 22.4%;left: 2.5%;margin-top: 27.4%;"
            ></p>
            <p
              class="blink"
              style="z-index: 7;background: #EEEEEE;width: 17.067%;padding-bottom: 4.267%;left: 22.767%;margin-top: 33.267%;"
            ></p>
            <p
              class="blink"
              style="z-index: 8;border-radius: 0% / 0%;background: rgb(239, 239, 239);width: 16%;padding-bottom: 16%;left: 6.767%;margin-top: 30.6%;"
            ></p>
            <p
              class="blink"
              style="z-index: 9;border-radius: 0% / 0%;background: rgb(255, 255, 255);width: 95%;padding-bottom: 22.4%;left: 2.5%;margin-top: 49.8%;"
            ></p>
            <p
              class="blink"
              style="z-index: 10;background: #EEEEEE;width: 12.8%;padding-bottom: 4.267%;left: 22.767%;margin-top: 55.667%;"
            ></p>
            <p
              class="blink"
              style="z-index: 11;border-radius: 0% / 0%;background: rgb(239, 239, 239);width: 16%;padding-bottom: 16%;left: 6.767%;margin-top: 53%;"
            ></p>
            <p
              class="blink"
              style="z-index: 12;border-radius: 0% / 0%;background: rgb(255, 255, 255);width: 95%;padding-bottom: 22.4%;left: 2.5%;margin-top: 72.2%;"
            ></p>
            <p
              class="blink"
              style="z-index: 13;background: #EEEEEE;width: 7.662%;padding-bottom: 4.267%;left: 22.767%;margin-top: 78.067%;"
            ></p>
            <p
              class="blink"
              style="z-index: 14;border-radius: 0% / 0%;background: rgb(239, 239, 239);width: 16%;padding-bottom: 16%;left: 6.767%;margin-top: 75.4%;"
            ></p>
          </div>
        </template>
        <!-- </template> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Slidingplate from '../components/SlidingPlate/Slidingplate.vue'
export default {
  name: 'Home',
  data() {
    return {
      active: '全部',
      new_song_list: [],
      isSHow: false,
      new_song_type: [
        {
          type: 0,
          name: '全部'
        },
        {
          type: 7,
          name: '华语'
        },
        {
          type: 96,
          name: '欧美'
        },
        {
          type: 8,
          name: '日本'
        },
        {
          type: 16,
          name: '韩国'
        }
      ],
      in: 0,
      banners: '',
      personalized: '',
      //TODO swiper配置↓
      swiperOption: {
        height: 140,
        loopAdditionalSlides: 2,
        spaceBetween: 30,
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // 设置分页器
        // pagination: {
        //   el: '.swiper-pagination'
        //   // 设置点击可切换
        //   // clickable: true
        // },
        // 设置自动轮播
        autoplay: true,
        // 设置轮播可循环
        loop: true
      }
    }
  },
  components: {
    Slidingplate
  },
  created() {
    this.getBannerFun()
    this.getPersonalizedFun()
    this.get_new_song()
  },

  methods: {
    play_music(v, s) {
      console.log(v)
      let coverImgUrl = v.al
        ? v.al.picUrl
        : v.album.blurPicUrl
        ? v.album.blurPicUrl
        : v.album.picUrl
        ? v.album.picUrl
        : v.album.artist.img1v1Url
        ? v.album.artist.img1v1Url
        : v.album.picUrl
      let data = {
        // ...this.$store.state.music_play_data,
        id: v.id,
        name: v.name,
        ar: v.artists,
        tracks: s,
        coverImgUrl
      }
      this.$store.dispatch('set_music_data', data)
    },
    get_new_song() {
      // TODO 获取新歌
      // this.new_song_type.forEach((item) => {
      // let i = 0
      // console.log('🚀 ~ i', this.new_song_type.length)
      console.log(this.in, this.new_song_type.length)
      if (this.in >= this.new_song_type.length) {
        return
      }
      this.axios({
        url: '/top/song',
        params: {
          type: this.new_song_type[this.in].type
        }
      })
        .then(res => {
          if (res.code == 200) {
            // console.log('🚀 ~ res', res.data[0].name)
            this.new_song_list.push(res.data.slice(0, 4))
            this.isSHow = true
          }
        })
        .then(() => {
          this.in += 1
          this.get_new_song()
          // console.log((this.in += 1))
        })
      // .then(this.get_new_song())
      // })
    },
    getBannerFun() {
      //TODO 获取首页banner图
      this.axios({
        method: 'get',
        url: '/banner?type=2'
      }).then(data => {
        console.log(data)
        if (data.code == 200) {
          this.banners = data.banners
        }
      })
    },
    getPersonalizedFun() {
      //TODO 获取推荐歌单
      this.axios({
        method: 'get',
        url: '/personalized',
        params: {
          limit: 6
        }
      }).then(data => {
        console.log(data)
        if (data.code == 200) {
          this.personalized = data.result
        }
      })
    },
    go_song_list(id) {
      console.log(id)
      this.$router.push({
        name: 'song_list',
        params: { id }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 0.5px;
}
.banner {
  min-height: 140px;
}
/deep/.van-tab {
  @apply flex-none;
}
@keyframes blink {
  0% {
    opacity: 0.4;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.4;
  }
}

.blink {
  @apply clear-both;
  position: absolute;
  animation-duration: 2s;
  animation-name: blink;
  animation-iteration-count: infinite;
}
</style>
