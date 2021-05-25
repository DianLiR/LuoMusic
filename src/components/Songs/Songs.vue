<template>
  <div
    :class="[
      'bg-gray-300 bg-opacity-50 pb-4',
      { 'pb-6': $store.state.show_min_play }
    ]"
  >
    <div class="w-full fixed h-4 top-0 text-white z-30 bg-transparent">
      <van-icon name="arrow-left" @click.stop="$router.back()" />
    </div>
    <van-image
      width="100vw"
      height="6rem"
      :src="artist.img1v1Url"
      fit="cover"
      lazy-load
      show-loading
    />
    <div
      class="relative py-1 flex flex-col  items-center -top-4 z-30 m-auto w-4/6 bg-white shadow-md rounded-lg "
    >
      <span>{{ artist.name }}</span>
      <span>
        <!-- {{ artist.alias[0] }} -->
      </span>
      <span></span>
    </div>
    <div class="w-11/12 -mt-3 m-auto rounded-sm overflow-hidden">
      <van-list>
        <van-cell
          @click="to_play(item.id, item.name, item.ar)"
          v-for="(item, i) in play_list.hotSongs"
          :key="i"
        >
          <template #title>
            <div class="flex items-center">
              <span :class="['mr-2', { 'text-red-500 text-tiny_2l': i < 3 }]">
                {{ i + 1 }}
              </span>
              <div class="flex flex-col">
                <span class="">{{ item.name }}</span>
                <span class="text-tiny text-gray-600 van-ellipsis w-20">
                  <template v-for="(val, index) in item.ar">
                    <template v-if="index">/</template>
                    {{ val.name }}
                  </template>
                  - {{ item.al.name }}
                </span>
              </div>
            </div>
          </template>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songs',
  data() {
    return {
      play_list: {},
      artist: ''
    }
  },
  created() {
    this.get_songs_detail()
  },
  methods: {
    to_play(id, name, ar) {
      let data = {
        coverImgUrl: this.play_list.artist.img1v1Url,
        id,
        name,
        ar,
        tracks: this.play_list.hotSongs
      }
      this.$store.dispatch('set_music_data', data)
    },
    get_songs_detail() {
      // if (this.$route.params.id == null) return
      this.axios({
        url: '/artists',
        params: {
          id: this.$route.params.id
        }
      }).then((res) => {
        this.play_list = res
        this.artist = res.artist
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
