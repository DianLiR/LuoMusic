<template>
  <div class="px-1">
    <div class="history mt-1 flex" v-if="search_history.length >= 1">
      <span class="w-5">历史</span>
      <div class="history_box w-full overflow-hidden h-auto">
        <div class="flex w-full flex-wrap">
          <van-tag
            round
            style="margin: 2px"
            color="#9ca3af"
            size="medium"
            @click="$emit('search', item)"
            v-for="(item, i) in search_history"
            :key="i"
            closeable
            @close="$store.commit('del_search', i)"
          >
            {{ item }}
          </van-tag>
        </div>
      </div>
    </div>
    <div>
      <div
        class="mt-1 py-0.5 border-b border-gray-400 w-full flex justify-between"
      >
        <span>热搜榜</span>
        <van-tag round color="#9ca3af" size="medium" @click="get_hot">
          更新
          <van-loading
            size=".45rem"
            text-size=".45rem"
            v-show="up_hot_loading"
          />
        </van-tag>
        <!--   <p class="flex">
            更新
            <van-loading size="20px" />
          </p> -->
      </div>
      <div class="flex flex-wrap">
        <p
          class="w-1/2 py-1"
          v-for="(item, i) in hots"
          :key="i"
          @click="$emit('search', item.first)"
        >
          <span :class="[{ 'text-red-500': i < 3 }, 'text-gray-500']">
            {{ i + 1 }}
          </span>
          <span :class="['ml-1', 'text-gray-600', { 'font-bold': i < 3 }]">
            {{ item.first }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search_default',
  // props: ['hots', 'up_hot_loading'],
  data() {
    return {
      search_default: '',
      hots: '',
      up_hot_loading: false
    }
  },
  computed: {
    search_history() {
      return this.$store.state.search_history
    }
  },
  created() {
    this.get_hot()
  },
  methods: {
    get_hot() {
      // 获取热搜
      this.up_hot_loading = true
      this.axios({
        url: '/search/hot'
      }).then((h_res) => {
        if (h_res.code == 200) {
          this.hots = h_res.result.hots
          this.up_hot_loading = false
        }
        // console.log('🚀 ~ res', h_res.result)
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
