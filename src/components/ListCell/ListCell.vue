<template>
  <div class="bg-white mb-1">
    <van-cell-group :title="t_name" :class="[!v_c ? 'flex flex-wrap ' : '']">
      <!--  <template #title>
        <p
          class="bg-white p-1 text-center text-black font-bold rounded-sm"
        >
          官方榜单
        </p>
      </template> -->
      <van-cell
        :class="['w-auto', !v_c ? 'p-1 test2' : '']"
        :title-class="['flex', 'flex-none']"
        :value-class="[
          v_c ? 'flex flex-col test1 text-left justify-around' : 'hidden '
        ]"
        v-for="(item, index) in list || 8"
        value=""
        :key="index"
        @click="$emit('go_song_list', item.id)"
      >
        <!-- <div > -->
        <template #title>
          <van-image
            :src="item.coverImgUrl"
            show-loading
            lazy-load
            fit="cover"
            height="100"
            width="100"
            class="rounded-sm overflow-hidden "
          ></van-image>
        </template>
        <template #default>
          <p class="truncate" v-for="(em, i) in item.tracks" :key="i">
            {{ em.first }} - {{ em.second }}
          </p>
        </template>
        <!-- </div> -->
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'ListCell',
  props: {
    list: {
      type: Array
    },
    v_c: {
      default: true
    },
    t_name: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
// .van-cell {
//   width: auto;
//   padding: 10px 0px;
// }
.test1 {
  text-align: left !important;
}
.test2 {
  width: auto;
  padding: 0.25rem !important;
}
</style>
