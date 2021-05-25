<template>
  <div class="p-1" v-if="$store.state.is_login">
    <div
      name="avatar"
      class="w-full my-3 flex flex-col items-center justify-center"
    >
      <!-- <van-image
        width="3rem"
        height="3rem"
        round
        class="shadow-lg"
        :src="info_data.profile.avatarUrl"
      /> -->
      <span class="">{{ info_data.profile.nickname }}</span>
    </div>
    <van-grid :column-num="4" class="text-tiny_1l justify-around">
      <van-grid-item text="粉丝" class="">
        <template #icon>
          <div>{{ info_data.profile.followeds }}</div>
        </template>
      </van-grid-item>
      <van-grid-item text="关注" class="">
        <template #icon>
          <div>{{ info_data.profile.follows }}</div>
        </template>
      </van-grid-item>
      <van-grid-item text="等级" class="">
        <template #icon>
          <div>Lv.{{ info_data.level }}</div>
        </template>
      </van-grid-item>
      <van-grid-item text="退出" @click="out_login"></van-grid-item>
    </van-grid>
    <div class="w-11/12 m-auto rounded-sm p-1 mt-2 shadow">
      <p class="text-tiny_2l font-bold">基本信息</p>
      <div name="content" class="text-tiny_2l">
        <p>注册日期: {{ info_data.profile.createTime | timerCount }}</p>
        <p>
          性别:
          {{
            info_data.profile.gender == 0
              ? '女'
              : info_data.profile.gender == 1
              ? '男'
              : '未知'
          }}
        </p>
        <p>
          个人介绍:
          {{
            info_data.profile.signature == ''
              ? '还没有填写个人介绍'
              : info_data.profile.signature
          }}
        </p>
      </div>
    </div>
    <div
      name="playlist"
      class="w-11/12 overflow-hidden rounded-sm shadow mt-2 m-auto"
    >
      <van-cell-group>
        <span class="text-qs px-1 font-bold">创建的歌单</span>
        <van-cell
          v-for="item in playlist"
          :key="item.id"
          @click="go_song_list(item.id)"
        >
          <template #title>
            <div class="flex ">
              <van-image
                :src="item.coverImgUrl"
                width="1.25rem"
                height="1.25rem"
                fit="cover"
              />
              <div class="ml-1 flex flex-col w-full">
                <p class=" truncate w-11/12 block">{{ item.name }}</p>
                <span>{{ item.trackCount }}首,播放{{ item.playCount }}次</span>
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      // info_data: ''
      playlist: ''
    }
  },
  computed: {
    info_data() {
      return this.$store.state.info_data ? this.$store.state.info_data : ''
    }
  },
  activated() {
    this.get_login_account()
  },
  // beforeEnter: (to, from, next) => {
  //   // ...
  //   next(() => {
  //     this.get_login_account()
  //   })
  // },
  created() {
    this.get_login_account()
    console.log('获取登录信息')
  },
  filters: {
    timerCount(v) {
      let da = new Date(v)
      // let new_da = new Date(Date.now() - v).getFullYear()

      let value = {
        y: da.getFullYear(),
        m: da.getMonth() + 1 + '月'
      }
      // let new_d = new Date().getFullYear()
      // console.log('🚀 ~ new_d', new_d, value.y)

      return +value.y + '年' + value.m
    }
  },
  methods: {
    out_login() {
      //TODO this.$toast.loading({
      //   duration: 0,
      //   forbidClick: true,
      //   overlay: true
      //   //轻提示
      // })
      // var timer = setTimeout(() => {
      this.playlist = null
      // this.$store.commit('out_login')
      this.$store.dispatch('del_all_data')
      this.$router.push({ name: 'login' })
      //TODO this.$toast.clear()
      console.log('退出登录方法')
      // clearInterval(timer)
      // }, 1000)
    },

    go_song_list(id) {
      console.log(id)
      this.$router.push({
        name: 'song_list',
        params: { id }
        //跳转歌单页面
      })
    },

    get_login_account() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        overlay: true
      })

      // console.log(Date.now())
      console.log('🚀 ~ .state.cookie', this.$store.state.cookie)
      console.log('🚀 ~ 登录后调用此接口 ,可获取用户账号信息')
      // 登录后调用此接口 ,可获取用户账号信息↓
      this.axios({
        method: 'post',
        url: '/user/account',
        data: {
          cookie: this.$store.state.cookie,
          timestamp: Date.now()
        }
      }).then((res) => {
        console.log('用户账号信息->', res.profile.nickname)
        console.log('🚀 ~ res.account.id', res.account.id)

        // this.info_data = res.profile
        this.get_login_detail(res.account.id) //获取用户详情
        this.get_subcount(res.account.id) //获取用户歌单
      })
    },

    get_login_detail(uid) {
      //获取用户详情
      this.axios({
        url: '/user/detail',
        method: 'post',
        data: {
          uid
        }
      }).then((res) => {
        // this.info_data = res
        console.log('获取用户详情-> 用户名', res.profile.nickname)
        this.$store.commit('set_info_data', res)
      })
    },

    get_subcount(uid) {
      // console.log('🚀 ~ uid', uid)
      //获取用户创建的歌单
      this.axios({
        url: '/user/playlist',
        method: 'post',
        data: {
          cookie: this.$store.state.cookie,
          timestamp: Date.now(),
          uid
        }
      }).then((res) => {
        if (res.code == 200) {
          console.log('获取用户创建的歌单-->', res)
          this.playlist = res.playlist
          this.$toast.clear()
        } else {
          this.$toast('获取失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
