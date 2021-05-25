<template>
  <van-list
    :class="$store.state.show_min_play ? 'pb-4' : ''"
    v-model="lazy_res.loading"
    :finished="lazy_res.finished"
    finished-text="没有更多了"
    @load="$emit('onLoad')"
  >
    <!-- value="内容" -->
    <van-cell
      v-for="item in search_res"
      :key="item.id"
      @click="to_play(item, search_res)"
    >
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="flex items-center">
          <!-- <p :class="[{ 'text-red-500': i < 3 }, 'w-2']">
            {{ i + 1 }}
          </p> -->

          <div class="flex flex-col ml-1">
            <span class="w-28 truncate">
              {{ item.name }}
            </span>
            <span class="text-tiny van-ellipsis w-20">
              <template v-for="(val, i_s) in item.artists">
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
</template>

<script>
export default {
  name: 'search-result',
  props: ['search_res', 'lazy_res'],
  methods: {
    to_play(v, s) {
      console.log(v, s)
      let data = {
        id: v.id,
        name: v.name,
        ar: v.artists,
        tracks: s,
        coverImgUrl: v.artists[0].img1v1Url
      }
      this.$store.dispatch('set_music_data', data)
    }
  },
  beforeDestroy() {
    //vue销毁之前
    this.$emit('del_search_res')
  }
}
</script>

<style lang="less" scoped></style>
