<template>
  <!-- <van-dropdown-menu>
      <van-dropdown-item
        @change="get_song_list()"
        v-model="value1"
        :options="option1"
      />
      <van-dropdown-item
        @change="get_song_list()"
        v-model="value2"
        :options="option2"
      />
    </van-dropdown-menu> -->
  <div class="px-1 relative h-full ">
    <van-index-bar :index-list="initial">
      <template v-for="(item, index) in song_list">
        <van-index-anchor :index="index + 1" :key="index">
          {{ item.name }}
        </van-index-anchor>
        <van-cell
          v-for="(v, i) in item.data"
          :key="i"
          @click.stop="to_detail(v)"
        >
          <template #title>
            <div class="flex items-center">
              <van-image
                :src="v.img1v1Url + '?param=50y50'"
                width="1.5rem"
                height="1.5rem"
                fit="cover"
                class="rounded-sm overflow-hidden"
              />
              <span class="ml-1">{{ v.name }}</span>
            </div>
          </template>
        </van-cell>
      </template>
    </van-index-bar>
  </div>
</template>

<script>
export default {
  name: 'friends',
  data() {
    return {
      // value1: -1,
      // value2: '-1',
      // option1: [
      //   { text: '全部', value: -1 },
      //   { text: '男歌手', value: 1 },
      //   { text: '女歌手', value: 2 },
      //   { text: '乐队', value: 3 }
      // ],
      // option2: [
      //   { text: '全部', value: '-1' },
      //   { text: '华语', value: '7' },
      //   { text: '欧美', value: '96' },
      //   { text: '日本', value: '8' },
      //   { text: '韩国', value: '16' },
      //   { text: '其它', value: '0' }
      // ],
      initial: [
        '热',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '#'
      ],
      song_list: []
    }
  },
  filters: {
    form_i(v) {
      return v + 1
    }
  },
  created() {
    this.init()
    this.get_song_list()
  },
  methods: {
    to_detail(v) {
      this.$router.push({ name: 'songs', params: { id: v.id } })
    },
    init() {
      for (var i = 0; i < this.initial.length; i++) {
        this.song_list.push({ name: this.initial[i] })
      }
    },
    // get_all_song() {
    //   this.initial.forEach((item) => {
    //     this.get_song_list(item)
    //   })
    // },
    get_song_list() {
      for (const key in this.song_list) {
        // console.log(key)
        let name = this.song_list[key].name
        let initial = name == '热' ? '-1' : name == '#' ? '0' : name
        this.axios({
          url: '/artist/list',
          params: {
            initial,
            type: -1, //-1:全部 1:男歌手 2:女歌手 3:乐队
            limit: Math.floor(Math.random() * (8 - 5 + 1)) + 5, //返回数量 , 默认为 30
            // offset: 0, //偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0,
            area: -1 //-1:全部 7华语 96欧美 8:日本 16韩国 0:其他
          }
        }).then(res => {
          // this.song_list = res.artists
          this.$set(this.song_list[key], 'data', res.artists)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
