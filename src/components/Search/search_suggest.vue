<template>
  <div class="p-1">
    <van-cell-group>
      <van-cell
        :title="item.keyword"
        icon="search"
        v-for="(item, index) in suggest_list"
        :key="index"
        @click="$emit('search', item.keyword)"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'search-suggest',
  props: ['value'],
  data() {
    return {
      suggest_list: ''
    }
  },

  watch: {
    value(newVal) {
      this.get_suggest(newVal)
    }
  },
  created() {
    this.get_suggest(this.value)
  },

  methods: {
    get_suggest() {
      if (this.value != '' && this.value != null) {
        this.axios({
          url: '/search/suggest',
          params: {
            keywords: this.value,
            type: 'mobile'
          }
        }).then((res) => {
          this.suggest_list = res.result.allMatch
        })
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
