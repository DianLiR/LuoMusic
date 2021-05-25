<template>
  <div class="search text-tiny_2l relative">
    <div
      class="w-full sticky z-50 top-0 h-6 p-1 text-qs flex items-center bg-white"
    >
      <van-icon name="arrow-left" @click="$router.back()" class="block p-0.5" />
      <!-- <van-form
        @submit="search_ent"
        class="border-b-2 w-5/6 ml-2 border-gray-400 "
      > -->
      <van-search
        class="test11 w-full p-0"
        @input="input_change"
        @search="search_ent($event)"
        v-model.trim="search_value"
        :placeholder="search_default"
      />
      <!-- <input
          class="bg-transparent w-full p-0"
          @input="input_change"
          v-model.trim="search_value"
          :clearable="false"
          :placeholder="search_default"
        /> -->
      <!-- </van-form> -->
    </div>
    <component
      :is="components_name"
      @search="search_change"
      :value="search_value"
      :search_res="search_res"
      :lazy_res.sync="lazy_res"
      @onLoad="onLoad"
      @del_search_res="del_search_res"
    />
  </div>
</template>

<script>
import searchDefault from '../components/Search/search_default.vue'
import searchSuggest from '../components/Search/search_suggest'
import searchResult from '../components/Search/search_result.vue'
export default {
  components: { searchDefault, searchSuggest, searchResult },
  name: 'search',
  data() {
    return {
      components_name: 'search-default',
      search_value: '',
      search_default: '',
      search_res: '',
      offset: 1,
      lazy_res: {
        loading: false,
        finished: false
      }

      // hots: '',
      // up_hot_loading: false
    }
  },
  created() {
    this.info()
  },
  methods: {
    info() {
      // 初始化
      this.get_default()
    },
    get_default() {
      // 获取默认搜索词
      this.axios({
        url: '/search/default'
      }).then((d_res) => {
        // console.log('🚀 ~ res', res)
        this.search_default = d_res.data.realkeyword
      })
    },

    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      console.log('发起请求')
      setTimeout(() => {
        this.offset += 1
        let limit = 10
        this.axios({
          url: '/search',
          params: {
            // ids: this.tracksIds.splice(0, 10).join()
            keywords: this.search_value,
            limit,
            offset: (this.offset - 1) * limit
          }
        }).then((res) => {
          console.log('🚀 ~ res', res)
          this.search_res.push(...res.result.songs)
        })
        // 加载状态结束
        this.lazy_res.loading = false

        // 数据全部加载完成
        if (this.search_res.length >= 80) {
          this.lazy_res.finished = true
        }
      }, 1000)
    },

    input_change(e) {
      //切换组件
      // if (e == null || e == '') return
      console.dir(e != null && e != '' && e.length > 1)
      if (e != null && e != '' && e.length > 1) {
        this.components_name = 'search-suggest'
      } else {
        this.components_name = 'search-default'
      }
      // console.log(this.components_name)
    },
    search_ent() {
      if (this.search_value.length < 1) return
      this.get_search_res()
      this.components_name = 'search-result'
    },
    search_change(e) {
      this.search_value = e
      this.search_ent()
    },
    del_search_res() {
      this.search_res = null
    },
    get_search_res() {
      this.axios({
        url: '/search',
        params: {
          keywords: this.search_value,
          limit: 10
        }
      }).then((res) => {
        console.log(res.result)
        this.$store.commit('set_search', this.search_value)

        this.search_res = res.result.songs
      })
    }
  }
}
</script>

<style lang="less" scoped>
.test11 {
  background: transparent !important;
}
</style>
