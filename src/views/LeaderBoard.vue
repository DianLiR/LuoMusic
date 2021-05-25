<template>
  <div class="p-1">
    <list-cell
      t_name="官方榜单"
      :list="toplist_2"
      class="rounded-sm overflow-hidden"
      @go_song_list="go_song_list"
    ></list-cell>
    <list-cell
      :list="toplist_1"
      :v_c="false"
      t_name="第三方榜单"
      class="rounded-sm overflow-hidden"
      @go_song_list="go_song_list"
    ></list-cell>
  </div>
</template>

<script>
import ListCell from '../components/ListCell/ListCell.vue'

export default {
  components: { ListCell },
  name: 'LeaderBoard',
  data() {
    return {
      toplist_1: [],
      toplist_2: []
    }
  },
  created() {
    this.axios({
      url: '/toplist/detail'
    }).then((res) => {
      //TODO ...获取所有榜单内容摘要
      if (res.code == 200) {
        // next((vm) => vm.get_all_lists(res.list))
        res.list.forEach((element) => {
          if (element.tracks.length <= 0) {
            this.toplist_1.push(element)
            // console.log('🚀 ~ this.toplist_1', this.toplist_1)
          } else {
            this.toplist_2.push(element)
            // console.log('🚀 ~  this.toplist_2', this.toplist_2)
          }
        })
        // if (res.list.tracks) {
        //   console.log('11')
        // }
        // this.toplist = res.list
      }
    })
    console.log(this.toplist_1)
    console.log(this.toplist_2)
  },
  /*  beforeRouteEnter(to, from, next) {
    window
      .axios({
        url: '/toplist/detail'
      })
      .then((res) => {
        //TODO ...获取所有榜单内容摘要
        if (res.code == 200) {
          // next((vm) => vm.get_all_lists(res.list))
          next((vm) => (vm.toplist = res.list))
        }
      })
  }, */
  methods: {
    go_song_list(id) {
      console.log(id)
      this.$router.push({
        name: 'song_list',
        params: { id }
      })
    }
    // get_all_lists(v) {
    //   // TODO 获取
    //   console.log('🚀 ~ v', v)
    // }
  }
}
</script>

<style lang="less" scoped></style>
