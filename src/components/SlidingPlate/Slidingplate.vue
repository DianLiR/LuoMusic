<template>
  <div class="sliding-plate mt-1 bg-white rounded">
    <van-cell :title="title_name" class="rounded-sm" :to="toName">
      <!-- <template #right-icon>
        <span
          class="border flex items-center border-gray-400 rounded-md px-0.5"
        >
          更多
          <van-icon name="arrow" />
        </span>
      </template> -->
    </van-cell>

    <swiper :options="swiperOption" class="p-1" ref="mySwiper">
      <swiper-slide v-for="item in swiper_data || 3" :key="item.id">
        <div class="relative" @click="$emit('go_song_list', item.id)">
          <van-tag
            v-if="item.playCount"
            size="medium"
            color="#cccccc30"
            style="position:absolute"
            class=" z-10 top-0.5 right-1 rounded-lg bg-opacity-80"
          >
            <!-- <font-awesome-icon far icon="play" size="xs" /> -->
            {{ item.playCount | playCount }}
          </van-tag>
          <van-image
            :src="item.picUrl"
            lazy-load
            width="2.6rem"
            height="2.6rem"
            show-loading
            fit="cover"
            class="rounded-sm overflow-hidden"
          />
          <p
            class="text-tiny -mt-0.5 w-11/12  m-auto border-black max-h-4 van-multi-ellipsis--l2"
          >
            {{ item.name }}
          </p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  // TODO 推荐歌单_公共模块
  name: 'SlidingPlate',
  props: {
    title_name: {
      type: String,
      default: '内容'
    },
    toName: {
      type: String,
      default: null
    },
    swiper_data: {
      default: null
    }
  },

  data() {
    return {
      //TODO swiper配置↓
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 10
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true
        // }
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
